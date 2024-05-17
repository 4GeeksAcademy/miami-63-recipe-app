import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar bg-body-tertiary">
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1" style={{ fontSize: '2em', marginLeft: '100px', color: 'red' }}>Chef Dojo</span>
				{
					store.user ?
						(
							<div className="Logout-Button">
								<div className="d-flex align-items-center justify-content-center bg-danger rounded-pill" style={{ color: 'white', fontSize: '1.25em', marginLeft: '1750px', width: '150px', height: '45px' }}><span class="border border-black">Logout</span></div>
							</div>
						) : (

							<div className="d-flex align-items-center">
								<div className="Login-Button">
									<Link to={"/login"} className="d-flex align-items-center justify-content-center bg-danger rounded-pill" style={{ color: 'white', fontSize: '1.25em', marginRight: '20px', width: '150px', height: '45px' }}>Log In</Link>
								</div>
								<div className="Signup-Button">
									<Link to={"/signup"} className="d-flex align-items-center justify-content-center bg-danger rounded-pill" style={{ color: 'white', fontSize: '1.25em', marginRight: '0px', width: '150px', height: '45px' }}>Sign Up</Link>
								</div>
							</div>
						)
				}

			</div>
		</nav>
	);
};
