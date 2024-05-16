import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-body-tertiary">
  			<div className="container-fluid">
    			<span className="navbar-brand mb-0 h1" style={{ fontSize:'2em', marginLeft: '100px', color:'red' }}>Chef Dojo</span>
		<div className="bg-transparent rounded-pill" style={{ fontSize:'1.25em', textAlign:'center', display:'inlineBlock', margin:'0 auto', width:'150px', height:'45px'}}><span class="border border-black">Log In</span></div>
		<div className="bg-danger rounded-pill" style={{ color:'white', fontSize:'1.25em', textAlign:'center', marginLeft:'600px', display:'inlineBlock', margin:'0 auto', width:'150px', height:'45px'}}>Sign Up</div>
  	</div>
</nav>
	);
};
