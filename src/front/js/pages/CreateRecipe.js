import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CreateRecipe = () => {

  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fats, setFats] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [cholestorol, setCholestorol] = useState(0);
  const [fiber, setFiber] = useState(0);
  const [sugar, setSugar] = useState(0);
  const modalRef = useRef(null)
  const navigate = useNavigate()

  const submitRecipe = async (e) => {
    e.preventDefault();
    console.log(name, description, ingredients, directions, calories, protein, carbohydrates, fats, sodium, cholestorol, fiber, sugar)
    // changed from saveRecipe to submit recipe to make the flux
    let current_recipe = { name: name, description: description, ingredients: ingredients, directions: directions, calories: calories, protein: protein, carbohydrates: carbohydrates, fats: fats, sodium: sodium, cholestorol: cholestorol, fiber: fiber, sugar: sugar }
    await actions.submitRecipe(current_recipe)
    // modalRef.current?.modal("hide")
    bootstrap.Modal.getInstance(modalRef.current).hide()
    setName("")
    setDescription("")
    setIngredients("")
    setDirections("")
    setCalories(0)
    setProtein(0)
    setCarbohydrates(0)
    setFats(0)
    setSodium(0)
    setCholestorol(0)
    setFiber(0)
    setSugar(0)
    // navigate("/createrecipe")
  };

  return (
    <>

      <div className="d-flex justify-content-between align-items-center">
        <h1 style={{ marginLeft: '325px' }}>Category Name</h1>

        <button type="button" className="btn button-accent rounded-pill" style={{ marginRight: '325px' }} data-bs-toggle="modal" data-bs-target="#createRecipeModal">
          Create
        </button>
      </div>

      {/* Create Recipe Modal */}
      <div ref={modalRef} className="modal fade" id="createRecipeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content" style={{ backgroundColor: '#f2f2f2' }}>
            <div className="modal-header">
              <h3 className="modal-title w-100 text-center" id="exampleModalLabel"><b>Create Recipe</b></h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Modal - Name */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label" style={{ marginLeft: '150px' }}><b>Recipe Name:</b></label>
              <input type="name" className="form-control w-75 mx-auto" id="addName" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>

            {/* Modal - Description */}
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label" style={{ marginLeft: '150px' }}><b>Description:</b></label>
              <input type="description" className="form-control w-75 mx-auto" id="addDescription" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            </div>

            {/* Modal - Ingredients */}
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label" style={{ marginLeft: '150px' }}><b>Ingredients:</b></label>
              <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>

            </div>

            {/* Modal - Directions */}
            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label" style={{ marginLeft: '150px' }}><b>Directions:</b></label>
              <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3" value={directions} onChange={(e) => setDirections(e.target.value)}></textarea>
            </div>

            {/* Modal - Nutrition Facts */}
            <div className="col-md-10">
              <div className="row">  <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="caloriesInput" className="form-label"><b>Calories:</b></label>
                <input type="calories" className="form-control w-25" id="caloriesInput" value={calories} onChange={(e) => setCalories(Number(e.target.value))}></input>
              </div>
              </div>

                <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="sodiumInput" className="form-label"><b>Sodium(mg):</b></label>
                  <input type="sodium" className="form-control w-25" id="sodiumInput" value={sodium} onChange={(e) => setSodium(Number(e.target.value))}></input>
                </div>
                </div>

                <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="proteinInput" className="form-label"><b>Protein(g):</b></label>
                  <input type="protein" className="form-control w-25" id="proteinInput" value={protein} onChange={(e) => setProtein(Number(e.target.value))}></input>
                </div>
                </div>

                <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="cholestorolInput" className="form-label"><b>Cholestorol(mg):</b></label>
                  <input type="cholestorol" className="form-control w-25" id="cholestorolInput" value={cholestorol} onChange={(e) => setCholestorol(Number(e.target.value))}></input>
                </div>
                </div>

              </div>

              <div className="row">  <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="carbohydratesInput" className="form-label"><b>Carbohydrates(g):</b></label>
                <input type="carbohydrates" className="form-control w-25" id="carbohydratesInput" value={carbohydrates} onChange={(e) => setCarbohydrates(Number(e.target.value))}></input>
              </div>
              </div>

                <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="fiberInput" className="form-label"><b>Fiber(g):</b></label>
                  <input type="fiber" className="form-control w-25" id="fiberInput" value={fiber} onChange={(e) => setFiber(Number(e.target.value))}></input>
                </div>
                </div>

                <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="fatsInput" className="form-label"><b>Fats(g):</b></label>
                  <input type="fats" className="form-control w-25" id="fatsInput" value={fats} onChange={(e) => setFats(Number(e.target.value))}></input>
                </div>
                </div>

                <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{ marginLeft: '150px' }}>  <label for="sugarInput" className="form-label"><b>Sugar(g):</b></label>
                  <input type="sugar" className="form-control w-25" id="sugarInput" value={sugar} onChange={(e) => setSugar(Number(e.target.value))}></input>
                </div>
                </div>

              </div>
            </div>

            {/* Modal - Footer */}
            <div className="modal-footer">
              <button type="button" className="btn button-accent rounded-pill mx-auto w-50 btn-lg" onClick={(e) => submitRecipe(e)}>Create</button>
            </div>
          </div>
        </div>

      </div>

      {/* Recipe List */}
      <div className="list-group">
        {store.recipes.map((recipe, index) =>
          <div className="recipe_button">
            <a href="#" className="list-group-item list-group-item-action list-group-item-danger" key={index}>{recipe.name}</a>
            <Link to={'/recipe/' + recipe.id}></Link>
          </div>
        )}
      </div>

    </>
  );
};