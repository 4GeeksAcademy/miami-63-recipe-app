"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import urllib.request
import urllib.parse
import json
import os
import requests

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

@api.route('/search', methods=['POST'])
def handle_search():
    print("Request received")
    searchUrl="https://api.nal.usda.gov/fdc/v1/foods/search"
    
    payload = {
        "query": request.json["query"]
    }
    #encoded_params = urllib.parse.urlencode(params)  # Encode parameters for URL

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
                
                flattened_food={
                     "description": food.get("description"),

                }
                for foodNutrient in food["foodNutrients"]:
                    if foodNutrient["nutrientName"] in foodNutrients:
                        flattened_food[
                            f"{foodNutrient['nutrientName']}UnitName": foodNutrient["unitName"]
                        ]
                        flattened_food[
                            f"{foodNutrient['nutrientName']}Value": foodNutrient["value"]
                        ]
                        
                    
                flattened_foods.append(flattened_food)
            
                   

     
        return flattened_foods
    except requests.RequestException as e:
        print(f"Error fetching data from USDA API: {e}")
        return jsonify({"error": "Error fetching data from API."}), 500

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
