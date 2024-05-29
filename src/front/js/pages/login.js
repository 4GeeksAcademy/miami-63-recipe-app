import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

<h1>Log in With Email</h1>

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "user@example.com" && password === "password") {

            navigate("/private");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h2>Login With Email</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <div class="container">
          <span class="psw"><a href="#">Forgot Password?</a></span>
        </div>
        <div className="login-img-wrapper">
        <img src="https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
        </div>
        
            </div>
        </div>
        
    );
};



export default Login;