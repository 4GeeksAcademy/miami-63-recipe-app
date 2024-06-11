import React, { useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import "../../styles/user-home.css";

export const RecipeBoard = () => {
    const { store, actions } = useContext(Context);
    // const { id } = useParams();
    const forward = useNavigate();

    // Sends the user to the main home page if not logged in
    useEffect(() => {
        if (store.token == null) {
            forward("/");
        }
    }, [store.token, forward]);

    return (
        <>
            <div className="container">
                <h1 className="mb-4">Recipe Board Name</h1>

                <h2>The recipes go here</h2>
            </div>
        </>
    );
};
