import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recipe-board.css";

export const RecipeBoard = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams(); // Get the category ID from the URL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [categoryRecipes, setCategoryRecipes] = useState(null);
  const modalRef = useRef(null);
  const [category, setCategory] = useState(null);

  const submitRecipe = async (e) => {
    e.preventDefault();
    let current_recipe = {
      name,
      description,
      ingredients,
      directions
    };
    await actions.submitRecipe(current_recipe, store.user, id);
    bootstrap.Modal.getInstance(modalRef.current).hide();
    setName("");
    setDescription("");
    setIngredients("");
    setDirections("");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCategoryData = async () => {
      if (id) {
        // Fetch recipes
        const fetchedCategoriesRecipes = await actions.fetchUserCategoriesRecipes(id);
        console.log('Fetched Categories Recipes:', fetchedCategoriesRecipes);
        if (isMounted) setCategoryRecipes(fetchedCategoriesRecipes);
  
        // Fetch category details
        const fetchedCategory = await actions.fetchCategoryById(id); // Fetch category details
        console.log('Fetched Category:', fetchedCategory);
        if (isMounted) setCategory(fetchedCategory); // Set the category object
      }
    };

    fetchCategoryData();

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when the component is unmounted
    };
  }, [id]);

  if (!categoryRecipes) {
    return <div className="container">Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <h1 className="mb-4">{category ? category.category_name : 'Loading...'}</h1>
        <div className="d-flex justify-content-between mb-4">
          <h3>Recipes</h3>
          <button
            type="button"
            className="btn button-accent rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#createRecipeModal"
          >
            Create
          </button>
        </div>

        {/* Recipe List */}
        <div className="list-group">
          {store.recipes.length > 0 ? (
            <ul className="list-group">
              {store.recipes.map((recipe, index) => (
                <Link to={`/recipe-page/${recipe.recipe_id}`} key={index}>
                  <li className="list-group-item">
                    <div>{recipe.recipe_name}</div>
                    <div className="description">{recipe.description}</div>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="alert alert-primary" role="alert">
              You do not yet have any recipes in this board
            </div>
          )}
        </div>
      </div>

      {/* Create Recipe Modal */}
      <div ref={modalRef} className="modal fade" id="createRecipeModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content" style={{ backgroundColor: "#f2f2f2" }}>
            <div className="modal-header">
              <h3 className="modal-title w-100 text-center" id="exampleModalLabel">
                <b>Create Recipe</b>
              </h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Modal - Name */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label" style={{ marginLeft: "150px" }}>
                <b>Recipe Name:</b>
              </label>
              <input type="name" className="form-control w-75 mx-auto" id="addName" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>

            {/* Modal - Description */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label" style={{ marginLeft: "150px" }}>
                <b>Description:</b>
              </label>
              <input type="description" className="form-control w-75 mx-auto" id="addDescription" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            </div>

            {/* Modal - Ingredients */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ marginLeft: "150px" }}>
                <b>Ingredients:</b>
              </label>
              <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>
            </div>

            {/* Modal - Directions */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label" style={{ marginLeft: "150px" }}>
                <b>Directions:</b>
              </label>
              <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3" value={directions} onChange={(e) => setDirections(e.target.value)}></textarea>
            </div>

            {/* Modal - Footer */}
            <div className="modal-footer">
              <button type="button" className="btn button-accent rounded-pill mx-auto w-50 btn-lg" onClick={(e) => submitRecipe(e)}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};