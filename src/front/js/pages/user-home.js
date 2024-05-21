import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SearchBG from "../../img/steak-image.png";
import "../../styles/user-home.css";

export const UserHome = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <div className="container-fluid d-flex justify-content-center search-section" style={{backgroundImage: `url(${SearchBG})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                <div className="d-flex align-items-center justify-content-center col-4">
                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" />
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};
