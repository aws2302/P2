import React, { useRef, useState } from "react";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";



const LoginPage = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loginError, setLoginError] = useState("");


    const navigate = useNavigate();

    const clickHandler = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).then(() => {
            navigate("/main");
        }).catch((error) => {
            setLoginError(error.message);
        });
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
                fontSize: "24px",
                paddingTop: "5rem"
            }}
        >
            <div>
                <h1 style={{ textAlign: "center", marginTop: "15px", marginBottom: "25px" }}>Welcome Back!</h1>
                <Input ref={emailRef} type="text">Email:</Input>
                <Input ref={passwordRef} type="password">Passwort:</Input>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>

                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25px" }}>
                    <Button onClick={clickHandler} style={{ textAlign: "center" }}> Einloggen → </Button>
                </div>

            </div>
            {loginError && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", color: "red" }}>
                    {loginError}
                </div>
            )}
        </div>
    );
};

export default LoginPage;
