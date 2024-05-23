import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import SearchBG from "../../img/steak-image.png";
import "../../styles/user-home.css";

export const ItemDetail = () => {
    const { store, actions } = useContext(Context);

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
