# app/utils/notification_email.py
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from dotenv import load_dotenv
from flask import render_template
from uuid import uuid4   # ← add this import

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
ADMIN_EMAIL = os.getenv("EMAIL_TO")

def send_booking_email(form_data: dict):
    guest_email = form_data.get("email")
    if not guest_email:
        print("❌ No guest email provided in form data")
        return False

    subject = "Conferma Prenotazione - La Quattordici"

    # Optional: ensure defaults available to the template
    ctx = {
        **form_data,
        "support_email": form_data.get("support_email") or "laquattordiciluxuryapartment@gmail.com",
        "business_phone": form_data.get("business_phone") or "+39 392 0242382",
    }

    # ✅ Pass a unique token to prevent trimming
    body = render_template("email.html", uniq=uuid4().hex, **ctx)

    msg = MIMEMultipart("related")
    msg["From"] = EMAIL_USER
    msg["To"] = guest_email
    msg["Cc"] = ADMIN_EMAIL
    msg["Subject"] = subject

    alt = MIMEMultipart("alternative")
    msg.attach(alt)
    alt.attach(MIMEText(body, "html"))

    # Inline logo (cid:main-logo)
    logo_path = os.path.join("app", "static", "images", "main-logo.png")
    try:
        with open(logo_path, "rb") as f:
            img = MIMEImage(f.read())
            img.add_header("Content-ID", "<main-logo>")
            img.add_header("Content-Disposition", "inline", filename="main-logo.png")
            msg.attach(img)
    except Exception as e:
        print(f"⚠️ Could not attach logo image: {e}")

    recipients = [guest_email, ADMIN_EMAIL]
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, recipients, msg.as_string())
        print("📨 Email sent successfully to guest and admin (CC).")
        return True
    except Exception as e:
        print("❌ Email sending failed:", e)
        return False

def send_contact_email(form_data: dict):
    from uuid import uuid4

    subject = "📩 Nuovo Messaggio dal Form Contatti"
    ctx = {
        "name": form_data.get("name"),
        "email": form_data.get("email"),
        "message": form_data.get("message"),
        "uniq": uuid4().hex,
    }

    body = render_template("email_contact.html", **ctx)

    msg = MIMEMultipart("related")
    msg["From"] = EMAIL_USER
    msg["To"] = ADMIN_EMAIL
    msg["Subject"] = subject

    alt = MIMEMultipart("alternative")
    msg.attach(alt)
    alt.attach(MIMEText(body, "html"))

    # inline logo
    logo_path = os.path.join("app", "static", "images", "main-logo.png")
    try:
        with open(logo_path, "rb") as f:
            img = MIMEImage(f.read())
            img.add_header("Content-ID", "<main-logo>")
            img.add_header("Content-Disposition", "inline", filename="main-logo.png")
            msg.attach(img)
    except Exception as e:
        print(f"⚠️ Could not attach logo image: {e}")

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_USER, EMAIL_PASS)
            server.sendmail(EMAIL_USER, ADMIN_EMAIL, msg.as_string())
        print("📨 Contact email sent successfully.")
        return True
    except Exception as e:
        print("❌ Failed to send contact email:", e)
        return False
