import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CreateRecipe = () => {
    
    const { store, actions } = useContext(Context);
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ ingredients, setIngredients ] = useState("");
    const [ directions, setDirections ] = useState("");
    const [ calories, setCalories ] = useState("");
    const [ protein, setProtein ] = useState("");
    const [ carbohydrates, setCarbohydrates ] = useState("");
    const [ fats, setFats ] = useState("");
    const [ sodium, setSodium ] = useState("");
    const [ cholestorol, setCholestorol ] = useState("");
    const [ fiber, setFiber ] = useState("");
    const [ sugar, setSugar ] = useState("");

    const navigate = useNavigate()

  const [recipe, saveRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    directions: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fats: "",
    sodium: "",
    cholestorol: "",
    fiber: "",
    sugar: "",
  })

  const submitRecipe = (e) => {
    e.preventDefault();
    console.log(name, description, ingredients, directions, calories, protein, carbohydrates, fats, sodium, cholestorol, fiber, sugar)
    actions.saveRecipe({name:name, description, ingredients, directions, calories, protein, carbohydrates, fats, sodium, cholestorol, fiber, sugar})
    createRecipeBox(recipe)
    setName("")
    setDescription("")
    setIngredients("")
    setDirections("")
    setCalories("")
    setProtein("")
    setCarbohydrates("")
    setFats("")
    setSodium("")
    setCholestorol("")
    setFiber("")
    setSugar("")
    navigate("/createrecipe")
  };

  function createRecipeBox(submitRecipe) {
    
  }

    return (
        <>

<div className="d-flex justify-content-between align-items-center">
<h1 style={{marginLeft: '725px'}}>Category Name</h1>

<button type="button" className="btn button-accent rounded-pill" style={{marginRight: '725px'}} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Create Recipe
</button>
</div>

{/* Create Recipe Modal */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content" style={{ backgroundColor: '#f2f2f2'}}>
      <div className="modal-header">
        <h3 className="modal-title w-100 text-center" id="exampleModalLabel"><b>Create Recipe</b></h3>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

{/* Modal - Name */}
<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label" style={{marginLeft: '150px'}}><b>Recipe Name:</b></label>
  <input type="email" className="form-control w-75 mx-auto" id="exampleFormControlInput1"></input>
</div>

{/* Modal - Description */}
<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label" style={{marginLeft: '150px'}}><b>Description:</b></label>
  <input type="email" className="form-control w-75 mx-auto" id="exampleFormControlInput1"></input>
</div>

{/* Modal - Ingredients */}
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label" style={{marginLeft: '150px'}}><b>Ingredients:</b></label>
  <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3"></textarea>

</div>

{/* Modal - Directions */}
<div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label" style={{marginLeft: '150px'}}><b>Directions:</b></label>
  <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>

{/* Modal - Nutrition Facts */}
<div className="col-md-10">
  <div className="row">  <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="caloriesInput" className="form-label"><b>Calories:</b></label>
        <input type="text" className="form-control w-25" id="caloriesInput"></input>
      </div>
    </div>

    <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="sodiumInput" className="form-label"><b>Sodium(mg):</b></label>
        <input type="text" className="form-control w-25" id="sodiumInput"></input>
      </div>
    </div>
  
    <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="proteinInput" className="form-label"><b>Protein(g):</b></label>
        <input type="text" className="form-control w-25" id="proteinInput"></input>
      </div>
    </div>

    <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="cholestorolInput" className="form-label"><b>Cholestorol(mg):</b></label>
        <input type="text" className="form-control w-25" id="cholestorolInput"></input>
      </div>
    </div>
  
  </div>

  <div className="row">  <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="carbohydratesInput" className="form-label"><b>Carbohydrates(g):</b></label>
        <input type="text" className="form-control w-25" id="carbohydratesInput"></input>
      </div>
    </div>

    <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="fiberInput" className="form-label"><b>Fiber(g):</b></label>
        <input type="text" className="form-control w-25" id="fiberInput"></input>
      </div>
    </div>

    <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="fatsInput" className="form-label"><b>Fats(g):</b></label>
        <input type="text" className="form-control w-25" id="fatsInput"></input>
      </div>
    </div>

    <div className="col-md-6">  <div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="sugarInput" className="form-label"><b>Sugar(g):</b></label>
        <input type="text" className="form-control w-25" id="sugarInput"></input>
      </div>
    </div>

  </div>
  </div>

{/* Modal - Footer */}
      <div className="modal-footer">
        <button type="button" className="btn button-accent rounded-pill mx-auto w-50 btn-lg">Create</button>
      </div>
    </div>
  </div>

</div>


{/* Recipe Grid Columns */}
<div className="container text-center">
  <div className="row row-cols-4">
    <div className="col">Column 1</div>
    <div className="col">Column 2</div>
    <div className="col">Column 3</div>
    <div className="col">Column 4</div>
  </div>
</div>

        </>
    );
};

// Extra Code

/* <div className="mb-3 d-flex flex-wrap">
  <label for="exampleFormControlTextarea1" className="form-label" style={{marginLeft: '150px'}}><b>Nutrition Facts:</b></label>
  <textarea className="form-control w-75 mx-auto" id="exampleFormControlTextarea1" rows="3"></textarea>

// function createIngredient() {
  //   return { name:"", unitAmount: "", ingredientName: "", directions:"" };
  // }
  
  // function submitRecipe() {
  //   const recipe = {
  //     name,
  //     ingredients,
  //     directions,
  //   };
  // }

    // function submitRecipe() {
    //   setRecipe({ name:"", ingredients: "", directions:""});
    //   // fetch request
    // }

// !!!YouTube Video - JS duo input box walkthrough!!!

    // function addInput(){
//   const unitAmount = document.createElement("input");
//   unitAmount.type="text";
//   unitAmount.placeholder = "Unit & Amount";

//   const ingredient = document.createElement("input");
//   ingredient.type="text";
//   ingredient.placeholder="Ingredient Name";

//   const btn = document.createElement("a");
//   btn.className = "delete";
//   btn.innerHTML = "&times";

//   btn.addEventListener("click", removeInput);

//   const flex = document.createElement("div");
//   flex.className = "flex";

//   input.appendChild(unitAmount);
//   input.appendChild(ingredient);
//   input.appendChild(btn);

//   input.appendChild(flex);
// }

// const addBtn = document.querySelector(".add");
// const input = document.querySelector(".inp-group");

// addBtn.addEventListener("click", addInput);


// !!!YouTube Video - Indian Guy!!!

  // function addDynamicInput() {
  //   const [ value, setValue ] = useState([]);
  //   const handleAdd= () => {
  //     const abc = [...value,[]]
  //     setValue(abc)
  //   }
  // }

  // const handleChange=(onChangeValue, i) => {
  //   const inputData=[...value]
  //   inputData[i]=onChangeValue.target.value;
  //   setValue(inputData)
  // }

  // const handleDelete = (i) => {
  //   const deleteVal = [...value]
  //   deleteValue.splice(i)
  //   setValue(setValue)
  // }
  
// console.log(value, "data") */

// Old Nutrition Facts Modal
{/* <div className="col-md-5">
<div className="row"> <div className="col-md-6"><div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Calories:</b></label>
  <input type="text" className="form-control w-25" id="caloriesInput"></input>
  </div>
</div>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Protein(g):</b></label>
  <input type="text" className="form-control w-25" id="proteinInput"></input>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Carbohydrates(g):</b></label>
  <input type="text" className="form-control w-25" id="carbohydratesInput"></input>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Fats(g):</b></label>
  <input type="text" className="form-control w-25" id="fatsInput"></input>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Sodium(mg):</b></label>
  <input type="text" className="form-control w-25" id="sodiumInput"></input>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Cholestorol(mg):</b></label>
  <input type="text" className="form-control w-25" id="cholestorolInput"></input>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Fiber(g):</b></label>
  <input type="text" className="form-control w-25" id="fiberInput"></input>
</div>

<div className="mb-3 d-flex justify-content-between" style={{marginLeft: '150px'}}>  <label for="exampleFormControlInput1" className="form-label"><b>Sugar(g):</b></label>
  <input type="text" className="form-control w-25" id="sugarInput"></input>
</div>

</div> */}