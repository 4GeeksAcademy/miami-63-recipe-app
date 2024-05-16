import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-center mt-5">

			<div class="images">
                <div class="image-slide">
                    <img src="https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg" />
                    <img src="https://www.eatingwell.com/thmb/m0nLGXor00bjRKFQcEUlMHv2Qmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6753430-928769f74aa24a25b43acb7d05d55054.jpg" />
                    <img src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/220719164934-01-inexpensive-food-healthy-stock.jpg?c=16x9&q=h_833,w_1480,c_fill" />
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400" />
                </div>
                <div class="image-slide">
                    <img src="https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg" />
                    <img src="https://www.eatingwell.com/thmb/m0nLGXor00bjRKFQcEUlMHv2Qmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6753430-928769f74aa24a25b43acb7d05d55054.jpg" />
                    <img src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/220719164934-01-inexpensive-food-healthy-stock.jpg?c=16x9&q=h_833,w_1480,c_fill" />
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400" />
                </div>
				<div class="image-slide">
                    <img src="https://fitmencook.com/wp-content/uploads/2023/03/mix-and-match-meal-prep11.jpg" />
                    <img src="https://www.eatingwell.com/thmb/m0nLGXor00bjRKFQcEUlMHv2Qmg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6753430-928769f74aa24a25b43acb7d05d55054.jpg" />
                    <img src="https://healthyfitnessmeals.com/wp-content/uploads/2021/02/Honey-garlic-chicken-meal-prep-9.jpg" />
                    <img src="https://media.cnn.com/api/v1/images/stellar/prod/220719164934-01-inexpensive-food-healthy-stock.jpg?c=16x9&q=h_833,w_1480,c_fill" />
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400" />
                </div>
            </div>

	<h1 style={{ fontSize:'6em', margin:'100px 0 0 0' }}>The best place to store your recipes!</h1>

	<h3 style={{ fontSize:'3em', margin:'100px 0 100px 0' }}>As the dojo awakens, the chef dons their apron like a warrior's armor, each tie a commitment to the craft.</h3>
			
			<div className="d-flex justify-content-center row">
			<div className="d-flex align-items-center justify-content-center bg-danger rounded-pill" style={{ fontSize:'1.5em', width:'200px', height:'60px' }}>Get Started</div>
			</div>
		</div>
	);
};
