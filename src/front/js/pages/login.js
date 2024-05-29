import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from 'react-router-dom';
import "../../styles/login.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const forward = useNavigate();
    const token = sessionStorage.getItem("token");

    // Sends the user to their page if logged in
    useEffect(() => {
        if (store.token && store.token != "" && store.token != undefined) {
            forward("/user-home");
        }
    }, [store.token, forward]);

    const handleClickSubmit = (event) => {
		actions.handleLogin(email, password);
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
                        <h1>Login Page</h1>
                        {token && token != "" && token != undefined ? "You are logged in" :
                            <form className="border p-4" onSubmit={handleClickSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
