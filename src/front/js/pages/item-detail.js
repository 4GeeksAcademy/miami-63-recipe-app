import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BackButton } from "../component/back-button";

import "../../styles/user-home.css";

export const ItemDetail = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const forward = useNavigate();

    // Sends the user to the main home page if not logged in
    useEffect(() => {
        if (store.token == null) {
            forward("/");
        }
    }, [store.token, forward]);

    // Check if store.items array exists and has at least one item
    if (!store.items || store.items.length === 0) {
        // If the array is empty or undefined, render an error message or return null
        return <div>No items found.</div>;
    }

    // Find the item in store.items array whose id matches the id parameter
    const item = store.items.find(item => item.id === parseInt(id));
    console.log("Here are the items sent from local storage", item)

    const column_1 = "col-10";
    const text_right = "text-end";

    return (
        <>
            <div className="container">
                <BackButton />

                <h1 className="mb-4">Nutrition Facts</h1>
                <h3 className="mb-4">{item.name}</h3>

                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th className={column_1}>Elements</th>
                            <th className={text_right}>Amount</th>
                            <th className={text_right}>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >Calories</td>
                            <td className={text_right}>{item.calories_value}</td>
                            <td className={text_right}>{item.calories_unit}</td>
                        </tr>
                        <tr>
                            <td >Total Fat</td>
                            <td className={text_right}>{item.fat_value}</td>
                            <td className={text_right}>{item.fat_unit}</td>
                        </tr>
                        <tr>
                            <td>Cholesterol</td>
                            <td className={text_right}>{item.cholesterol_value}</td>
                            <td className={text_right}>{item.cholesterol_unit}</td>
                        </tr>
                        <tr>
                            <td>Sodium</td>
                            <td className={text_right}>{item.sodium_value}</td>
                            <td className={text_right}>{item.sodium_unit}</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates</td>
                            <td className={text_right}>{item.carbohydrates_value}</td>
                            <td className={text_right}>{item.carbohydrates_unit}</td>
                        </tr>
                        <tr>
                            <td>Fiber</td>
                            <td className={text_right}>{item.fiber_value}</td>
                            <td className={text_right}>{item.fiber_unit}</td>
                        </tr>
                        <tr>
                            <td>Protein</td>
                            <td className={text_right}>{item.protein_value}</td>
                            <td className={text_right}>{item.protein_unit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};
