import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/chef-dojo-logo.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light pt-3 pb-3">
			<div className="container">
				<Link to="/">
				<img src={Logo} />
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn button-default rounded-pill me-3">Log In</button>
					</Link>
					<Link to="/demo">
						<button className="btn button-accent rounded-pill">Sign Up</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
