"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, User_Category, User_Recipe, User_Recipe_Ingredient
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
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
        return jsonify(access_token=access_token, user_id=user.id)
    else:
        return jsonify({"msg": "Bad email or password"}), 401

#Sign up user
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

#Get all users
@api.route('/users', methods=['GET'])
def get_all_users():

    try:
        users = User.query.all()
        serialized_users = [user.serialize() for user in users] 
        return jsonify(serialized_users), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500 

#Reset email
def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message(
        subject="Chef-Dojo Password Reset",
        sender='noreply@chefdojo.com',
        recipients=[user.email])
    msg.body = f'''To reset your password, please follow the link below:
    https://orange-broccoli-j4rpj6prpr2qpvq-3000.app.github.dev/change-password?token={token}

    If you did not make this request then simply ignore this email.
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
@api.route('/change-password', methods=['POST'])
def reset_token():
    token = request.json.get("token")
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

        # Flatten the payload to only include desired fields and filter duplicates
        if 'foods' in response_data:
            flattened_foods = []
            seen_names = set()
            
            for food in response_data['foods']:
                name = food.get("description")
                if name not in seen_names:
                    seen_names.add(name)
                    flattened_food = {
                        "name": name,
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

# Create and get category for user
@api.route('/categories/<int:user_id>', methods=['POST', 'GET'])
def handle_categories(user_id):
    data = None
    status = 200
    message = ""

    if request.method == 'POST':
        category_name = request.json.get("category_name", None)

        if category_name is None:
            status = 400
            message = "please fill out the required fields"
        else:
            user_category = User_Category(user_id=user_id, category_name=category_name)
            db.session.add(user_category)
            db.session.commit()

            data = category_name
            status = 200
            message = "successfully created category"

    elif request.method == 'GET':
        user_categories = User_Category.query.filter_by(user_id=user_id).all()

        if not user_categories:
            status = 404
            message = "there are no categories for this user"
        else:
            data = [category.serialize() for category in user_categories]
            status = 200
            message = "successfully fetched"
    return jsonify({"msg": message, "data": data}), status

# Delete user category
@api.route('/categories/<int:user_id>/<int:category_id>', methods=['DELETE'])
def delete_categories(user_id, category_id):
    user_category = User_Category.query.filter_by(user_id=user_id, category_id=category_id).first()

    if user_category is None:
        return jsonify({"msg": "Category not found"}), 404
    
    db.session.delete(user_category)
    db.session.commit()

    return jsonify({"msg": "Category deleted successfully"}), 200

@api.route('/recipes/<int:user_id>/<int:category_id>', methods=['POST'])
def create_recipe(user_id, category_id):
    # Check if the category_id exists in the user_category table
    category = User_Category.query.filter_by(category_id=category_id).first()
    if not category:
        return jsonify({"error": "Category does not exist"}), 400

    # Extract data from the request JSON
    recipe_name = request.json.get("recipe_name", None)
    description = request.json.get("description", None)
    ingredients = request.json.get("ingredients", None)
    directions = request.json.get("directions", None)

    # Create a new User_Recipe instance
    user_recipe = User_Recipe(
        user_id=user_id,
        category_id=category_id,  # Include the category_id in the creation
        recipe_name=recipe_name,
        description=description,
        ingredients=ingredients,
        directions=directions
    )

    # Add the new recipe instance to the database session and commit the changes
    db.session.add(user_recipe)
    db.session.commit()

    return jsonify(user_recipe.serialize()), 201  # Return a 201 status code for successful creation

# Gets all recipes in a specific category
@api.route('/recipes/<int:user_id>/<int:category_id>', methods=['GET'])
def get_recipes_by_category(user_id, category_id):
    # Query the User_Recipe table to get recipes for the specified user and category
    recipes = User_Recipe.query.filter_by(user_id=user_id, category_id=category_id).all()
    
    # Check if any recipes are found
    if not recipes:
        return jsonify({"error": "No recipes found for this user and category"}), 404
    
    # Serialize the recipes and return the response
    serialized_recipes = [recipe.serialize() for recipe in recipes]
    return jsonify(serialized_recipes), 200

# Gets recipe by id
@api.route('/recipe/<int:recipe_id>', methods=['GET'])
def get_recipe_by_id(recipe_id):
    # Query the User_Recipe table to get the recipe with the specified ID
    recipe = User_Recipe.query.filter_by(recipe_id=recipe_id).first()

    # Check if the recipe is found
    if not recipe:
        return jsonify({"error": "Recipe not found"}), 404

    # Serialize the recipe and return the response
    return jsonify(recipe.serialize()), 200

# Delete recipe by id
@api.route('/recipe/<int:recipe_id>', methods=['DELETE'])
def delete_recipe_by_id(recipe_id):
    # Query the User_Recipe table to get the recipe with the specified ID
    recipe = User_Recipe.query.filter_by(recipe_id=recipe_id).first()

    if recipe is None:
        return jsonify({"msg": "Recipe not found"}), 404
    
    db.session.delete(recipe)
    db.session.commit()

    return jsonify({"msg": "Recipe deleted successfully"}), 200

# Gets category by id
@api.route('/category/<int:category_id>', methods=['GET'])
def get_category_by_id(category_id):
    try:
        # Fetch the category from the database
        category = User_Category.query.filter_by(category_id=category_id).first()
        
        if not category:
            return jsonify({"error": "Category not found"}), 404
        
        # Serialize the category object
        category_data = category.serialize()
        
        return jsonify(category_data), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500