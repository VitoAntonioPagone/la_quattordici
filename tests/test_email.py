import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Load .env variables
load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
EMAIL_TO   = os.getenv("EMAIL_TO")

print("🔎 ENV check:")
print("   EMAIL_USER:", EMAIL_USER)
print("   EMAIL_PASS set:", bool(EMAIL_PASS))
print("   EMAIL_TO:", EMAIL_TO)

# Prepare test email
msg = MIMEText("This is a test email from Booking system ✅")
msg["Subject"] = "SMTP Test"
msg["From"] = EMAIL_USER
msg["To"] = EMAIL_TO

try:
    print("📡 Connecting to Gmail SMTP...")
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.sendmail(EMAIL_USER, EMAIL_TO, msg.as_string())
        print("📨 Test email sent successfully!")
except Exception as e:
    print("❌ Email test failed:", e)
