import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { BackButton } from "../component/back-button";
import "../../styles/home.css";

export const RecipePage = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            if (id) {
                const fetchedRecipe = await actions.fetchRecipeById(id);
                console.log('Fetched Recipe:', fetchedRecipe); // Log the fetched recipe
                setRecipe(fetchedRecipe);

                // Fetch category details
                const category = await actions.fetchCategoryById(id); // Ensure you have an action to fetch category details
                console.log('Fetched Category:', category);
            }
        };

        fetchRecipe();
    }, [id, actions]);

    if (!recipe) {
        return <div className="container">Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <BackButton />

                <h1 className="mb-4">{recipe.recipe_name}</h1>

                <div>
                    <h2>Description</h2>
                    <p>{recipe.description}</p>
                </div>

                <div>
                    <h2>Ingredients</h2>
                    <p>{recipe.ingredients}</p>
                </div>

                <div>
                    <h2>Directions</h2>
                    <p>{recipe.directions}</p>
                </div>

            </div>
        </>
    );
};

export default RecipePage;