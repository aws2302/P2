import React, { useRef, useState } from "react";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firestore_database } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AccountPage = () => {
  const emailRef = useRef(null); // Initialize with null
  const passwordRef = useRef(null); // Initialize with null
  const [signUpError, setSignUpError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const clickHandlerLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/main");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const clickHandlerRegister = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const usersCollection = collection(firestore_database, "users");
      const userData = {
        email: userCredential.user.email,
      };
      await addDoc(usersCollection, userData);

      navigate("/main");
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  return (
    <div       style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "darkgrey",
      fontSize: "24px",
      paddingTop: "5rem",
      backgroundColor: "darkgrey",
    }}>
      <div>
        <Input ref={emailRef} type="email">Email:</Input>
        <Input ref={passwordRef} type="password">Passwort (mindestens 6 Zeichen!):</Input>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>
          <Button onClick={clickHandlerRegister} className="button">Konto erstellen →</Button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px" }}>
        {signUpError && (
          <div style={{ color: "red" }}>{signUpError}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "25px" }}>
          <Button onClick={clickHandlerLogin}>Einloggen →</Button>
        </div>
        {loginError && (
          <div style={{ color: "red", marginTop: "15px" }}>{loginError}</div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
