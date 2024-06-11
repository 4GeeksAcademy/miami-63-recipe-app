import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import "../../styles/home.css";

// remove props and use useParams() instead
// look at the starwars reading project

export const RecipePage = () => {

    let { data } = useParams();
    console.log("data");

    return (
        <>
            <div className="RecipeName">
                <h1>{name}</h1>
            </div>

            <div className="Description">
                <h2>Description</h2>
                <p>{description}</p>
            </div>

            <div className="Ingredients">
                <h2>Ingredients</h2>
                <p>{ingredients}</p>
            </div>

            <div className="Directions">
                <h2>Directions</h2>
                <p>{directions}</p>
            </div>

            <div className="NutritionFacts">
                <h2>Nutrition Facts</h2>

                {/* Nutrition Facts - Row 1 */}
                <div className="container text-center">
                    <div className="row row-cols-4">
                        <div className="col">Calories: {calories}</div>
                        <div className="col">Protein (g): {protein}</div>
                        <div className="col">Carbohydrates (g): {carbohydrates}</div>
                        <div className="col">Fats (g): {fats}</div>
                    </div>
                </div>

                {/* Nutrition Facts - Row 2 */}
                <div className="container text-center">
                    <div className="row row-cols-4">
                        <div className="col">Sodium (mg): {sodium}</div>
                        <div className="col">Cholesterol (mg): {cholesterol}</div>
                        <div className="col">Fiber (g): {fiber}</div>
                        <div className="col">Sugar (g): {sugar}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

RecipePage.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    directions: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fats: PropTypes.number.isRequired,
    sodium: PropTypes.number.isRequired,
    cholesterol: PropTypes.number.isRequired,
    fiber: PropTypes.number.isRequired,
    sugar: PropTypes.number.isRequired,
};

RecipePage.defaultProps = {
    name: "Recipe Name",
    description: "This is a great recipe because...",
    ingredients: "List of ingredients...",
    directions: "Step by step instructions...",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    sodium: 0,
    cholesterol: 0,
    fiber: 0,
    sugar: 0,
};

export default RecipePage;