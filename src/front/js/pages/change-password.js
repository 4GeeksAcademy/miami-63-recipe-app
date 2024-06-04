import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const ChangePassword = () => {
    const [ searchParams ] = useSearchParams();
    const { store, actions } = useContext(Context);
    const [password, setPassword] = useState("");
    const forward = useNavigate();

    // Sends the user to their page if logged in
    useEffect(() => {
        const token = searchParams.get("token")
        if (!token) {
            forward("/");
        }
    }, []);

    const handleClickSubmit = (event, password) => {
        event.preventDefault();
        actions.handlePasswordChange(password, searchParams.get("token"))
        // Add logic to handle password change here
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
                        <h2>Set New Password</h2>
                        
                        <form className="mb-3" onSubmit={(e) => handleClickSubmit(e, password)}>
                            <div className="user-box">
                                <input type="password" required value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="col-12 btn button-accent rounded-pill pt-3 pb-3">Confirm New Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};