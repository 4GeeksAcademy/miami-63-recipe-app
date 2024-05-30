import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const forward = useNavigate();

    // Sends the user to the main home page if not logged in
    useEffect(() => {
        if (store.token && store.token != "" && store.token != undefined) {
            forward("/");
        }
    }, [store.token, forward]);

    const handleClickSubmit = (event) => {
		actions.handleSignup(email, password);
        event.preventDefault()
	};

    return (
        <>
            <div className="d-flex vh-100">
                <div className="col-5 d-flex justify-content-center align-items-center">
                    <video className="video" autoPlay loop muted="muted">
                        <source src="https://cdn.pixabay.com/video/2023/03/02/152834-804130720_large.mp4" type="video/webm" />
                    </video>
                </div>
                <div className="col-7 d-flex justify-content-center">
                    <div className="col-6 login-form">
                        <h2>Sign up to Chef-Dojo</h2>
                        
                        <form className="mb-3" onSubmit={handleClickSubmit}>
                            <div className="user-box">
                                <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="user-box">
                                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="col-12 btn button-accent rounded-pill pt-3 pb-3">Signup</button>
                        </form>
                        <div className="d-flex justify-content-center">
                            <span>
                                <Link className="text-decoration-none text-muted" to={"/login"}>Already have an account? Log In</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
