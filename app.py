from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import requests
import os 
app = Flask(__name__)

# Set a secret key for session management
app.secret_key = 'dada'
GOOGLE_API_KEY = "AIzaSyBiKajPXnVbEGMSqUkgPKNlkIq3NPconU0" 

# Home Route
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/features')
def features():
    return render_template('features.html')


# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'rasulstorm@gmail.com'
app.config['MAIL_PASSWORD'] = 'bcau wwkz rvke fygg'
mail = Mail(app)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message_text = request.form.get('message')

        # Email configuration
        msg = Message(
            f"New Message from {name}",
            sender=app.config['MAIL_USERNAME'],  # Your Gmail address
            recipients=['rasulstorm@gmail.com']  # Replace with your actual email
        )
        msg.body = f"Name: {name}\nEmail: {email}\nMessage:\n{message_text}"

        mail.send(msg)

        flash(f"Thank you, {name}. Your message has been sent!")
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/showcase')
def showcase():
    return render_template('showcase.html')

@app.route('/showcase/route-optimization')
def route_optimization():
    return render_template('route_optimization.html')

@app.route('/showcase/digital-twin')
def digital_twin():
    return render_template('digital_twin.html')

@app.route('/showcase/store-reservation', methods=['GET', 'POST'])
def store_reservation():
    if request.method == 'POST':
        location = request.form.get('location')
        size = request.form.get('size')
        duration = request.form.get('duration')

        # Send email (optional)
        msg = Message(
            "New Storage Reservation",
            sender=app.config['MAIL_USERNAME'],
            recipients=['rasulstorm@gmail.com']
        )
        msg.body = f"""
        New Storage Reservation:
        Location: {location}
        Size: {size} m³
        Duration: {duration}
        """
        mail.send(msg)

        return "Success", 200

    # Render the form for GET requests
    return render_template('store_reservation.html')

@app.route("/route", methods=["POST"])
def get_route():
    data = request.json
    start = data.get("start")
    destination = data.get("destination")
    waypoints = data.get("waypoints", "")

    # Prepare the Google Directions API request
    url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        "origin": start,
        "destination": destination,
        "waypoints": waypoints,  # Waypoints formatted as "location1|location2"
        "key": GOOGLE_API_KEY
    }

    response = requests.get(url, params=params)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch route"}), response.status_code

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

