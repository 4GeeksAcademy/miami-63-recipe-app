import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signUp.css";
import { Link, useNavigate } from "react-router-dom";

<h1>Sign Up to Chef-Dojo</h1>

const signUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        
        if (name && email && password) {
            
            alert("Sign-up successful!");
            navigate("/login");
        } else {
            alert("Please fill in all fields");
        }
    };
    

    return (
        <div className="signUp-wrapper">
            <div className="signUp-box">
                <h2>Sign Up For Chef-Dojo</h2>
                <form onSubmit={handleSignup}>
                    <div className="user-box">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="user-box">
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="user-box">
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signUp-button">
                        Create Account
                    </button>
                </form>
                
                <div class="container">
          <span class="account">Already have an account?<a href="#"></a></span>
          <Link to={"/login"}>Log In</Link>
        </div>
        <div className="signUp-img-wrapper">
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
        </div>
            </div>
        </div>
        
    );
};

export default signUp;