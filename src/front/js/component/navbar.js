import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Logo from "../../img/chef-dojo-logo.png";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar pt-3 pb-3 mb-5">
			<div className="container">
				<Link to={"/"}>
					<img src={Logo} />
				</Link>
				{
					store.user ?
						(
							<div className="Logout-Button">
								<div className="d-flex align-items-center justify-content-center bg-danger rounded-pill" style={{ color: 'white', fontSize: '1.25em', marginLeft: '1750px', width: '150px', height: '45px' }}><span class="border border-black">Logout</span></div>
							</div>
						) : (

							<div className="d-flex align-items-center">
								<div className="Login-Button">
									<Link to={"/login"} className="btn button-default rounded-pill me-3">Log In</Link>
								</div>
								<div className="Signup-Button">
									<Link to={"/signup"} className="btn button-accent rounded-pill">Sign Up</Link>
								</div>
							</div>
						)
				}

			</div>
		</nav>
	);
};
