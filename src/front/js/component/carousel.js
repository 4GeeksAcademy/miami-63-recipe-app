import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/carousel.css";

export const Carousel = () => {

	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">

            <div className="images mb-5">
                <div className="image-slide">
                    <img src="https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg" />
                    <img src="https://www.eatingwell.com/thmb/m0nLGXor00bjRKFQcEUlMHv2Qmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6753430-928769f74aa24a25b43acb7d05d55054.jpg" />
                    <img src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/220719164934-01-inexpensive-food-healthy-stock.jpg?c=16x9&q=h_833,w_1480,c_fill" />
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400" />
                </div>
                <div className="image-slide">
                    <img src="https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg" />
                    <img src="https://www.eatingwell.com/thmb/m0nLGXor00bjRKFQcEUlMHv2Qmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6753430-928769f74aa24a25b43acb7d05d55054.jpg" />
                    <img src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/220719164934-01-inexpensive-food-healthy-stock.jpg?c=16x9&q=h_833,w_1480,c_fill" />
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400" />
                </div>
                <div className="image-slide">
                    <img src="https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg" />
                    <img src="https://www.eatingwell.com/thmb/m0nLGXor00bjRKFQcEUlMHv2Qmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6753430-928769f74aa24a25b43acb7d05d55054.jpg" />
                    <img src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/220719164934-01-inexpensive-food-healthy-stock.jpg?c=16x9&q=h_833,w_1480,c_fill" />
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400" />
                </div>
            </div>

        </div>
	);
};