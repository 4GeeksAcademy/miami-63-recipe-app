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

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/search', methods=['POST'])
def handle_search():
    searchUrl="https://api.nal.usda.gov/fdc/v1/foods/search"
    searchParams =request_body["search"]
    # data={
    #     "query":searchParams,
    # }
    # params={
    #     "Content-Type": "application/json",
    #     "X-Api-Key":os.environ.get(API_KEY), 
    # }
    # try:
    #     response=requests.post(searchUrl, headers=params, json=data)
    #     return response.json()
    # except requests.exceptions.RequestException as e:
    #     print(f"Error fetching data from api: {e}")
    # Prepare the URL parameters
    params = {
        "query": searchParams
    }
    encoded_params = urllib.parse.urlencode(params)  # Encode parameters for URL

    # Prepare the request headers
    headers = {
        "Content-Type": "application/json",
        "X-Api-Key": "vAQDhBNLzyLTc1uPSLlZQ7Dusf84Kwzdmc94zREG",
    }

    try:
        print("Trying to get the data", jsonify(response_data))
        # Build the complete URL with parameters
        url = f"{searchUrl}?{encoded_params}"

        # Create the request object
        req = urllib.request.Request(url, headers=headers)

        # Send the POST request and get the response
        with urllib.request.urlopen(req) as response:
            data = response.read().decode("utf-8")
            response_data = json.loads(data)  # Parse JSON response

        # Return the JSON data from the response
        print("Got the data", jsonify(response_data))
        return jsonify(response_data)
    except urllib.error.URLError as e:
        print(f"Error fetching data from USDA API: {e}")
        return jsonify({"error": "Error fetching data from API."}), 500


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
