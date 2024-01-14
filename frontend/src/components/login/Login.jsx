import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import { useAlert } from "react-alert";


var FormData = require('form-data');

const Login = () => {
    const alert = useAlert();
    const Navigate = useNavigate();


    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [name, setName] = useState("");



    const loginSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(loginEmail);

        if (isValid) {

            try {
                await axios.post(
                    `https://quiz-backend-one-fawn.vercel.app/api/v1/login`,
                    {
                        "email": loginEmail,
                        "password": loginPassword
                    },
                    { withCredentials: true }
                );
                alert.success('Logged In successfully')
                Navigate('/')


            } catch (error) {
                console.log(error)
                alert.error(error.response.data.message)
            }
        }
        else {
            alert.error('enter a valid email')
        }
    };

    const registerSubmit = async (e) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(loginEmail);
        if (isValid) {
            if (loginPassword.length >= 8) {

                try {
                    await axios.post(
                        `https://quiz-backend-one-fawn.vercel.app/api/v1/register`,
                        {
                            "name": name,
                            "email": loginEmail,
                            "password": loginPassword
                        },
                        { withCredentials: true }
                    );
                    alert.success('Registered successfully');
                    Navigate('/')

                } catch (error) {
                    console.log(error)
                    alert.error(error.response.data.message)
                }
            }
            else {
                alert.error('Password must contain atleast 8 character')
            }
        }
        else {
            alert.error('enter a valid email')
        }


    };

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <Fragment>
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p
                                onClick={(e) => switchTabs(e, "login")}
                            >LOGIN</p>
                            <p
                                onClick={(e) => switchTabs(e, "register")}
                            >REGISTER</p>
                        </div>
                        <button
                            ref={switcherTab}
                        ></button>
                    </div>
                    <form className="loginForm"
                        ref={loginTab}
                        onSubmit={loginSubmit}
                    >
                        <div className="loginEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="signUpEmail">
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="signUpPassword">
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;