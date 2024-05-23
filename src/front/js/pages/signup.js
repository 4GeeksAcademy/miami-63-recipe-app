import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from 'react-router-dom';
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
            <div className="container">
                <h1>Signup Page</h1>
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
            </div>
        </>
    );
};
