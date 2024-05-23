import React, { useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SearchBG from "../../img/steak-image.png";
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
                <h1 className="mb-4">Nutrition Facts</h1>
                <h3 className="mb-4">Banana</h3>

                <table class="table table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th className={column_1}>Elements</th>
                            <th className={text_right}>Amount</th>
                            <th className={text_right}>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >Total Fat</td>
                            <td className={text_right}>4.8</td>
                            <td className={text_right}>g</td>
                        </tr>
                        <tr>
                            <td>Cholesterol</td>
                            <td className={text_right}>165</td>
                            <td className={text_right}>mg</td>
                        </tr>
                        <tr>
                            <td>Sodium</td>
                            <td className={text_right}>71</td>
                            <td className={text_right}>mg</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates</td>
                            <td className={text_right}>71</td>
                            <td className={text_right}>mg</td>
                        </tr>
                        <tr>
                            <td>Fiber</td>
                            <td className={text_right}>71</td>
                            <td className={text_right}>mg</td>
                        </tr>
                        <tr>
                            <td>Protein</td>
                            <td className={text_right}>71</td>
                            <td className={text_right}>mg</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};
