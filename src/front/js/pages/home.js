import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import "../../styles/home.css";

import { Carousel } from "../component/carousel";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const forward = useNavigate();

    // Sends the user to their page if logged in
    useEffect(() => {
        if (store.token && store.token != "" && store.token != undefined) {
            forward("/user-home");
        }
    }, [store.token, forward]);

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
                </div>
            </div>
        </>
    );
};
