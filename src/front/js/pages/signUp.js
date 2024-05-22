import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

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
        <div className="signup-wrapper">
            <div className="signup-box">
                <h2>Sign Up</h2>
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
                    <button type="submit" className="signup-button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default signUp;