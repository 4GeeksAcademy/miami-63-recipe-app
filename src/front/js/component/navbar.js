import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import Logo from "../../img/chef-dojo-logo.png";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar bg-white pt-4 pb-4 mb-5 drop-shadow">
			<div className="container">
				<Link to={"/"}>
					<img src={Logo} />
				</Link>
				
				{!store.token ?
					<div className="d-flex align-items-center">
						<div className="Login-Button">
							<Link to={"/login"} className="btn button-default rounded-pill me-3">Log In</Link>
						</div>
						<div className="Signup-Button">
							<Link to={"/signup"} className="btn button-accent rounded-pill">Sign Up</Link>
						</div>
					</div> 
					:
						<button onClick={() => actions.handleLogout()} className="btn button-default rounded-pill">Logout</button>
				}
			</div>
		</nav>
	);
};
