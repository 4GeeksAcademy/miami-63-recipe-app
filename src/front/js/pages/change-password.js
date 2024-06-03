import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const ChangePassword = () => {
    const { token } = useParams();
    const { store } = useContext(Context);
    const [newPassword, setNewPassword] = useState("");
    const forward = useNavigate();

    // Sends the user to their page if logged in
    useEffect(() => {
        if (store.token && store.token !== "" && store.token !== undefined) {
            forward("/user-home");
        }
    }, [store.token, forward]);

    const handleClickSubmit = (event) => {
        event.preventDefault();
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
                        
                        <form className="mb-3" onSubmit={handleClickSubmit}>
                            <div className="user-box">
                                <input type="password" required value={newPassword} placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="col-12 btn button-accent rounded-pill pt-3 pb-3">Confirm New Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};