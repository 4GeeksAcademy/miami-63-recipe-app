import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import {useNavigate} from 'react-router-dom';
import "../../styles/login.css";

export const ResetRequest = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const forward = useNavigate();
    const [hasError, setHasError] = useState(false);

    // Sends the user to their page if logged in
    useEffect(() => {
        if (store.token && store.token != "" && store.token != undefined) {
            forward("/user-home");
        }
    }, [store.token, forward]);

    const handleClickSubmit = async (event) => {
        event.preventDefault();
        const success = await actions.handlePasswordReset(email);
        if (success) {
            forward("/login");
            setHasError(false);
        } else {
            // Handle the error case (e.g., show an error message to the user)
            console.error("Password reset request failed");
            setHasError(true);
        }
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
                        <h2>Reset Password Request</h2>
                        <p className="form-text text-muted">Please type in your email and we'll send you and email with a link to reset your password.</p>
                        <form className="mb-3" onSubmit={handleClickSubmit}>
                            <div className="user-box">
                                <input type="email" required value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            {hasError &&
                                <p className="form-text text-danger">There was an error please try again</p>
                            }
                            <button type="submit" className="col-12 btn button-accent rounded-pill pt-3 pb-3">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
