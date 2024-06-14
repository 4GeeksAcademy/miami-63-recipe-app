import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/recipe-board.css";
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { BackButton } from "../component/back-button";

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
  const [search, setSearch] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const backendURL = process.env.BACKEND_URL;
  const forward = useNavigate();

  const submitRecipe = async (e) => {
    e.preventDefault();
    setIngredients(selectedIngredients.join(", "));
    let current_recipe = {
      name,
      description,
      ingredients: selectedIngredients.join(", "), // Use selectedIngredients here
      directions
    };
    await actions.submitRecipe(current_recipe, store.user, id);
    const fetchedCategoriesRecipes = await actions.fetchUserCategoriesRecipes(id);
    setCategoryRecipes(fetchedCategoriesRecipes);
    bootstrap.Modal.getInstance(modalRef.current).hide();
    setName("");
    setDescription("");
    setIngredients("");
    setDirections("");
    setSelectedIngredients([]); // Clear selectedIngredients after submitting
  };

  useEffect(() => {
    let isMounted = true;

    if (!store.user) return;

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
  }, [id, store.user]);

  if (!categoryRecipes) {
    return <div className="container">Loading...</div>;
  }

  const handleSearch = () => {
    actions.itemSearch(search);
  };

  const handleClear = () => {
    actions.itemClear();
  };

  const handleAddItem = (item) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, item.name]);
  };

  const handleDeleteItem = (item) => {
    setSelectedIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient !== item));
  };

  const handleDeleteRecipe = async (event, index) => {
    event.preventDefault();
    try {
      const recipeId = store.recipes[index].recipe_id; // Make sure this is the correct property name
      const response = await fetch(`${backendURL}/api/recipe/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${store.token}`
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const fetchedCategoriesRecipes = await actions.fetchUserCategoriesRecipes(id);
      setCategoryRecipes(fetchedCategoriesRecipes);
      console.log(result);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <>
      <div className="container">
        <BackButton />
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
                  <li className="list-group-item d-flex rounded-pill border-0 drop-shadow mb-2">
                    <div className="col-10 ps-2">
                      <div>{recipe.recipe_name}</div>
                      <div className="description">{recipe.description}</div>
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                      <button className="round-button-small" onClick={(event) => handleDeleteRecipe(event, index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                      </button>
                    </div>
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: "#f2f2f2" }}>
            <div className="modal-header">
              <h3 className="modal-title w-100 text-center" id="exampleModalLabel">
                <b>Create Recipe</b>
              </h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    {/* Modal - Name */}
                    <div className="mb-3">
                      <label htmlFor="addName" className="form-label">
                        <b>Recipe Name:</b>
                      </label>
                      <input type="name" className="form-control" id="addName" value={name} onChange={(e) => setName(e.target.value)}></input>
                    </div>

                    {/* Modal - Description */}
                    <div className="mb-3">
                      <label htmlFor="addDescription" className="form-label">
                        <b>Description:</b>
                      </label>
                      <input type="description" className="form-control" id="addDescription" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                    </div>

                    {/* Ingredient search bar */}
                    <div className="d-flex flex-column align-items-start justify-content-center mb-3">
                      <div className="mb-1">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                          <b>Ingredients:</b>
                        </label>
                      </div>
                      <div className="col-12 d-flex">
                        {store.items.length > 0 && (
                          <button className="search-query-clear" type="button" onClick={handleClear}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                            </svg>
                          </button>
                        )}
                        <input
                          className={`search-query-input border border-muted ${store.items.length > 0 ? 'ps-5' : 'ps-4'}`}
                          placeholder="Search Ingredient"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onKeyPress={(element) => {
                            if (element.key === "Enter") {
                              handleSearch();
                            }
                          }}
                        />
                        <button className="search-query-submit" type="submit" onClick={handleSearch}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <CSSTransition in={store.items.length > 0} timeout={300} classNames="slide" unmountOnExit>
                        <div className="col-12 scrollable-section mb-5">
                          <ul className="list-group list-group-flush">
                            {store.items.map((item, index) => (
                              <li className="list-group-item d-flex justify-content-between align-items-center" key={index} onClick={() => handleAddItem(item)}>
                                <span className="col-8">
                                  <Link to={`/item-detail/${item.id}`} className="link-hover">{item.name}</Link>
                                </span>
                                <span>
                                  <button type="button" className="round-button-small">
                                    &#43;
                                  </button>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CSSTransition>
                    </div>

                    {/* Modal - Ingredients List */}
                    <div className="mb-3">
                      <ul className="list-group list-group-flush">
                        {selectedIngredients.map((ingredient, index) => (
                          <li className="list-group-item d-flex" key={index}>
                            <div className="col-10">{ingredient}</div>
                            <div className="col-2 d-flex justify-content-end">
                              <button className="round-button-small" type="button" onClick={() => handleDeleteItem(ingredient)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Modal - Directions */}
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea2" className="form-label">
                        <b>Directions:</b>
                      </label>
                      <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" value={directions} onChange={(e) => setDirections(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>
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