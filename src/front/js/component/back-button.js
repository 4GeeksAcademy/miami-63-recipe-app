import React from "react";
import { useNavigate } from 'react-router-dom';
import "../../styles/back-button.css";

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button className="round-button-large mb-5" onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg>
        </button>
    );
};