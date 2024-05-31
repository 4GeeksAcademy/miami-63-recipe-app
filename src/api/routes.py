"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, jwt_required
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message

import urllib.request
import urllib.parse
import json
import os
import requests

app = Flask(__name__)
bcrypt = Bcrypt(app)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Ensure app configurations are correctly set up
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'ZESJxyxt7rzzmrFNRVumV3VnzmSuJ1W5')
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = "repartomoro@gmail.com"
app.config['MAIL_PASSWORD'] =  "gdwu ojlq akev qdzg"

mail = Mail(app)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if email is None or password is None:
        return jsonify({"msg": "Please fill out the required fields"}), 400
    
    user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()
    
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad email or password"}), 401

@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None:
        return jsonify({"msg": "Please fill out the required fields"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = User(email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message(
        subject="Chef-Dojo Password Reset",
        sender='noreply@chefdojo.com',
        recipients=[user.email])
    msg.body = f'''To reset your password, please follow the link below:
    {url_for('api.reset_token', token=token, _external=True)}
    '''
    mail.send(msg)

# Endpoint for requesting a password reset
@api.route('/reset-password', methods=['POST'])
def reset_request():
    email = request.json.get("email", None)

    user = db.session.execute(db.select(User).filter_by(email=email)).scalar_one_or_none()

    if user:
        send_reset_email(user)
        return jsonify({"msg": f"An email has been sent to {email} with instructions to reset your password."})
    else:
        return jsonify({"msg": f"No user in the database with email {email}"}), 404

# Endpoint for resetting the password with a token
@api.route('/reset-password/<token>', methods=['POST'])
def reset_token(token):
    user = User.verify_reset_token(token)
    
    if user is None:
        return jsonify({"msg": "That is an invalid or expired token"}), 400

    new_password = request.json.get("password", None)
    
    if not new_password:
        return jsonify({"msg": "Password is required"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
    user.password = hashed_password
    db.session.commit()

    return jsonify({"msg": "Your password has been updated!"})

# Endpoint for ingredient search feature
@api.route('/search', methods=['POST'])
def search():
    # Define a dictionary to map original nutrient names to custom property names
    custom_property_names = {
        "Carbohydrate, by difference": "carbohydrates",
        "Total lipid (fat)": "fat",
        "Protein": "protein",
        "Energy": "calories",
        "Sugars, total including NLEA": "sugars",
        "Fiber, total dietary": "fiber",
        "Sodium, Na": "sodium",
        "Cholesterol": "cholesterol"
    }

    search_url = "https://api.nal.usda.gov/fdc/v1/foods/search"

    payload = {
        "query": request.json["query"]
    }

    # Prepare the request headers
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": os.environ["API_KEY"],
    }

    try:
        response = requests.post(search_url, headers=headers, json=payload)
        response_data = response.json()

        # Flatten the payload to only include desired fields
        if 'foods' in response_data:
            flattened_foods = []
            
            for food in response_data['foods']:
                flattened_food = {
                    "name": food.get("description"),
                    "id": food.get("fdcId")
                }

                for foodNutrient in food["foodNutrients"]:
                    nutrient_name = foodNutrient["nutrientName"]
                    if nutrient_name in custom_property_names:
                        custom_property_name = custom_property_names[nutrient_name]
                        flattened_food[f"{custom_property_name}_unit"] = foodNutrient["unitName"]
                        flattened_food[f"{custom_property_name}_value"] = foodNutrient["value"]

                flattened_foods.append(flattened_food)
            
            return jsonify(flattened_foods)
    
    except requests.RequestException as e:
        print(f"Error fetching data from USDA API: {e}")
        return jsonify({"error": "Error fetching data from API."}), 500
