import os
import sys


from flask import Flask, current_app

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Float, Table
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

db = SQLAlchemy()

app = Flask(__name__)

class User(db.Model):
    __tablename__ = "user"


    user_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except Exception as e:
            print(f"Error verifying token: {e}")
            return None
        return User.query.get(user_id)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class User_Recipe(db.Model):
    __tablename__ = "user_recipe"

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    recipe_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    recipe_title = db.Column(db.String, nullable=False)
    description = db.Column(db.String(240), nullable=True)
    recipe_ingredients = db.Column(db.String, nullable=False)
    recipe_directions = db.Column(db.String, nullable=False)

    nutrition_facts_id = db.Column(db.Integer, db.ForeignKey("nutrition_facts.id"), nullable=False)

    def __repr__(self):
        return f'<User_Recipes {self.recipe_id}'

   
    def serialize(self):
        return {
            "user_id": self.user_id,
            "recipe_id": self.recipe_id,
            "recipe_title": self.recipe_title,
            "description": self.description,
            "recipe_ingredients": self.recipe_ingredients,
            "recipe_directions": self.recipe_directions,
        }

class User_Category(db.Model):
    __tablename__ = "user_category"

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(90), nullable=False)

    def __repr__(self):

        return f'<User_Category {self.category_id}'
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            "category_id": self.category_id,
            "category_name": self.category_name
        }

class User_Recipe_Ingredient(db.Model):
    __tablename__ = "user_recipe_ingredient"

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("user_recipe.recipe_id"), nullable=False)
    user_recipe_ingredient_id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Float, nullable=True)
    protein_in_grams = db.Column(db.Float, nullable=True)
    carbohydrates_in_grams = db.Column(db.Float, nullable=True)
    fats_in_grams = db.Column(db.Float, nullable=True)
    sodium_in_mg = db.Column(db.Float, nullable=True)
    cholestorol_in_mg = db.Column(db.Float, nullable=True)
    fiber_in_grams = db.Column(db.Float, nullable=True)
    sugars_in_grams = db.Column(db.Float, nullable=True)

    def __repr__(self):

        return f'<User_Recipe_Ingredient {self.user_recipe_ingredient_id}>'
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            "recipe_id": self.recipe_id,
            "calories": self.calories,
            "protein_in_grams": self.protein_in_grams,
            "carbohydrates_in_grams": self.carbohydrates_in_grams,
            "fats_in_grams": self.fats_in_grams,
            "sodium_in_mg": self.sodium_in_mg,
            "cholestorol_in_mg": self.cholestorol_in_mg,
            "fiber_in_grams": self.fiber_in_grams,
            "sugars_in_grams": self.sugars_in_grams
        }

class User_Categories(db.model):
    __tablename__ = "user_categories"

    user_id = db.column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(90), nullable=False)

    def __repr__(self):
        return f'<User_Categories {self.category_id}'
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            "category_id": self.category_id,
            "category_name": self.category_name
        }

class Nutrition_Facts(db.model):
    __tablename__ = "nutrition_facts"

    user_id = db.column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    nutrition_facts_id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Float, nullable=False)
    protein_in_grams = db.Column(db.Float, nullable=False)
    carbohydrates_in_grams = db.Column(db.Float, nullable=False)
    fats_in_grams = db.Column(db.Float, nullable=False)
    sodium_in_mg = db.Column(db.Float, nullable=False)
    cholestorol_in_mg = db.Column(db.Float, nullable=False)
    fiber_in_grams = db.Column(db.Float, nullable=False)
    sugars_in_grams = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Nutrition_Facts {self.nutrition_facts_id}'
    
    def serialize(self):
        return {
            "user_id": self.user_id,
            "nutrition_facts_id": self.nutrition_facts_id,
            "calories": self.calories,
            "protein_in_grams": self.protein_in_grams,
            "carbohydrates_in_grams": self.carbohydrates_in_grams,
            "fats_in_grams": self.fats_in_grams,
            "sodium_in_mg": self.sodium_in_mg,
            "cholestorol_in_mg": self.cholestorol_in_mg,
            "fiber_in_grams": self.fiber_in_grams,
            "sugars_in_grams": self.sugars_in_grams
        }
