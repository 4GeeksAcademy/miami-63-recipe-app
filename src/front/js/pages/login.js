import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from 'react-router-dom';
import "../../styles/login.css";
import "../../styles/home.css";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const forward = useNavigate();
    const token = sessionStorage.getItem("token");

    const handleClickSubmit = (event) => {
		event.preventDefault()
		actions.handleLogin(email, password);
	};

    if (store.token && store.token != "" && store.token != undefined) forward("/user-home");

    return (
        <>
            <div className="container">
                <h1>Login Page</h1>
                {token && token != "" && token != undefined ? "You are logged in" :
                    <form className="col-6 border p-4" onSubmit={handleClickSubmit}>
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
        </>
    );
};
