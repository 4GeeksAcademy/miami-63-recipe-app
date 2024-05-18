<<<<<<< HEAD
import React, { useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import SearchBG from "../../img/steak-image.png";
import "../../styles/user-home.css";

export const UserHome = () => {
    const { store, actions } = useContext(Context);
    const [search, setSearch] = useState("")
    const forward = useNavigate();

    // Sends the user to the main home page if not logged in
    useEffect(() => {
        if (store.token == null) {
            forward("/");
        }
    }, [store.token, forward]);

    const handleSearch = () => {
		actions.itemSearch(search);
	};

    return (
        <>
            <div className="container-fluid d-flex justify-content-center search-section mb-5" style={{backgroundImage: `url(${SearchBG})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="d-flex align-items-center justify-content-center col-4">
                    <input className="search-query-input" placeholder="Search Ingredient" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(element) => {
						if (element.key === "Enter") {
							handleSearch();
						};
					}} />
                    <button className="search-query-submit" type="submit" onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="container">
                {store.items != "" ?
                    <div className="col-12 scrollable-section mb-5">
                        <ul className="list-group list-group-flush">
                            {store.items.map((item, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                    <span>
                                        <Link to={`/item-detail/${item.id}`} className="text-decoration-none text-muted">{item.name}</Link>
                                    </span>
                                    <span>
                                        <button type="button" className="btn button-accent rounded-pill">+ Add Ingredient</button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                :
                    null
                }

                <div className="d-flex justify-content-end mb-4">
                    <Link to={"#"} className="btn button-accent rounded-pill ps-4 pe-4">Create Recipe Board</Link>
                </div>

                <div className="d-flex flex-wrap justify-content-between">
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img className="category-image mb-4" src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
=======
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/user-home.css";

import { Carousel } from "../component/carousel";

export const userHome = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <Carousel />

            <div className="container text-center">

                <div className="mb-5">
                    <h1 className="home-title mb-3">
                        The best place<br />
                        to store your recipes!
                    </h1>
                    <p className="home-blurp">Chef-Dojo is the ultimate app for storing, organizing, and sharing your culinary creations. Whether you are a seasoned chef or just starting out in the kitchen, Chef-Dojo makes it easy to keep all your recipes in one place.</p>
                </div>

                <div className="">
                    <Link to={"/signup"} className="btn button-accent rounded-pill fs-5 ps-4 pe-4 pt-3 pb-3">Get Started</Link>
>>>>>>> 4ce9365 (Initial commit for the user home page)
                </div>
            </div>
        </>
    );
};
