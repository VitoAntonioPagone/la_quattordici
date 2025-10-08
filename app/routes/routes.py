from flask import Blueprint, render_template, request, jsonify
from app.utils.notification_email import send_booking_email, send_contact_email

main_bp = Blueprint("main", __name__)

# 🌍 Homepages
@main_bp.route("/")
def home():
    # Default to Italian
    return render_template("index-it.html", lang="it")

@main_bp.route("/it")
def italian():
    return render_template("index-it.html", lang="it")

@main_bp.route("/en")
def english():
    return render_template("index-en.html", lang="en")

# 📩 Contacts
@main_bp.route("/contact")
def contact_auto():
    """Detect browser language and show correct contact page."""
    lang = request.accept_languages.best_match(["en", "it"])
    if lang == "it":
        return render_template("contact-it.html", lang="it")
    return render_template("contact-en.html", lang="en")

@main_bp.route("/contact-it")
def contact_it():
    return render_template("contact-it.html", lang="it")

@main_bp.route("/contact-en")
def contact_en():
    return render_template("contact-en.html", lang="en")

# ------------------------
# API Routes
# ------------------------
routes = Blueprint("routes", __name__)

@routes.route("/send-booking", methods=["POST"])
def send_booking():
    data = request.json
    if send_booking_email(data):
        return jsonify({"success": True, "message": "Booking email sent successfully!"}), 200
    return jsonify({"success": False, "message": "Error sending email."}), 500

@routes.route("/send-contact", methods=["POST"])
def send_contact():
    data = request.get_json(force=True)
    print("📩 Received data:", data)
    if send_contact_email(data):
        return jsonify({"success": True, "message": "Message sent successfully!"}), 200
    return jsonify({"success": False, "message": "Error sending message."}), 500
