
import os
from flask_admin import Admin
from .models import db, User, User_Recipe, User_Category, User_Recipe_Ingredient
from flask_admin.contrib.sqla import ModelView

class UserRecipeModelView(ModelView):
    column_list = ['user_id', 'recipe_id', 'recipe_title', 'description', 'recipe_ingredients', 'recipe_directions']
    form_columns = ['user_id', 'recipe_id', 'recipe_title', 'description', 'recipe_ingredients', 'recipe_directions']

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(User_Recipe, db.session))
    admin.add_view(ModelView(User_Category, db.session))
    admin.add_view(ModelView(User_Recipe_Ingredient, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))