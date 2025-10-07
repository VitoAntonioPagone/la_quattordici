from flask import Blueprint, jsonify
import requests
from ics import Calendar
from datetime import timedelta
import concurrent.futures

calendar_bp = Blueprint("calendar", __name__)

# Aggiungi qui i tuoi link ICS (Airbnb + Booking)
ICS_URLS = [
    # Airbnb
    "https://www.airbnb.com/calendar/ical/1503566059500444737.ics?s=356e6817996594ae2d13c161d2e69222",

    # Booking
    "https://ical.booking.com/v1/export?t=724fb8d4-a9df-44da-a824-882693879293"
]


def fetch_calendar(url):
    """Scarica e parse un calendario ICS da un URL con log compatti."""
    try:
        print(f"\n🔄 Fetching calendar: {url}")
        r = requests.get(url, timeout=10)
        r.raise_for_status()

        raw_text = r.text.strip()
        print(f"📥 {url} → {len(raw_text)} chars downloaded")

        # Parse ICS
        c = Calendar(raw_text)
        events = list(c.events)
        print(f"✅ {url} → {len(events)} events parsed")

        # Show only first few events
        for i, ev in enumerate(events[:3], 1):
            print(f"   {i}. {ev.name} | {ev.begin.date()} → {ev.end.date()}")
        if len(events) > 3:
            print(f"   ... (+{len(events) - 3} more events)")

        return events

    except Exception as e:
        print(f"❌ Error fetching {url}: {e}")
        return []


@calendar_bp.route("/api/booked-dates")
def booked_dates():
    """Restituisce un JSON con tutte le date prenotate (Airbnb + Booking)."""
    booked = set()

    # Scarica i calendari in parallelo
    with concurrent.futures.ThreadPoolExecutor() as executor:
        all_events_lists = executor.map(fetch_calendar, ICS_URLS)

    # Itera sugli eventi trovati
    for events in all_events_lists:
        for event in events:
            start = event.begin.date()
            end = event.end.date()

            # Booking e Airbnb danno end = checkout, quindi NON includiamo il checkout
            current = start
            while current < end:
                booked.add(current.isoformat())
                current += timedelta(days=1)

    print(f"\n➡️ Returning {len(booked)} booked dates total")
    return jsonify(sorted(booked))


@calendar_bp.route("/api/calendar-status")
def calendar_status():
    """Endpoint diagnostico: mostra se i calendari sono stati caricati con successo."""
    status = []
    for url in ICS_URLS:
        try:
            r = requests.get(url, timeout=5)
            r.raise_for_status()
            c = Calendar(r.text)
            status.append({"url": url, "events": len(c.events), "ok": True})
        except Exception as e:
            status.append({"url": url, "events": 0, "ok": False, "error": str(e)})
    return jsonify(status)
