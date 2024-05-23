"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import urllib.request
import urllib.parse
import json
import os
import requests

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from flask_bcrypt import Bcrypt

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

foodNutrients = [
     "Carbohydrate, by difference",
     "Total lipid (fat)",
     "Protein",
     "KCAL",
     "Sugars, total including NLEA",
     "Fiber, total dietary",
     "Sodium, Na",

]

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
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    if email is None or password is None:
        return "Please fill out the riquered fields"
    
    user = db.session.execute(db.select(User).filter_by(email=email, password=password)).scalar_one()
    print(user)

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

@api.route("/signup", methods=["POST"])
def signup():
    print("this is working")
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None or password is None:
        return "Please fill out the riquered fields"

    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

# Endpoint for ingredient search feature
@api.route('/search', methods=['POST'])
def search():
    print("Request received")
    searchUrl="https://api.nal.usda.gov/fdc/v1/foods/search"
    
    payload = {
        "query": request.json["query"]
    }

    # Prepare the request headers
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": os.environ["API_KEY"],
    }
    try:
        response = requests.post(searchUrl, headers=headers, json=payload)
        response_data = response.json()

        # Flatten the payload to only include desired fields
        if 'foods' in response_data:
            flattened_foods = []
            for food in response_data['foods']:
                
                flattened_food = {
                     "name": food.get("description"),
                    #  "item-name": food.get("finalFoodInputFoods"),
                }
                for foodNutrient in food["foodNutrients"]:
                    if foodNutrient["nutrientName"] in foodNutrients:
                        flattened_food[f"{foodNutrient['nutrientName']}UnitName"]= foodNutrient["unitName"]
                        flattened_food[f"{foodNutrient['nutrientName']}Value"]= foodNutrient["value"]

                flattened_foods.append(flattened_food)
            
        return flattened_foods
    
    except requests.RequestException as e:
        print(f"Error fetching data from USDA API: {e}")