import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SearchBG from "../../img/steak-image.png";
import "../../styles/user-home.css";

export const ItemDetail = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container d-flex justify-content-center">
                <h1>This is the Item Details page</h1>
            </div>
        </>
    );
};
