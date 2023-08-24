import React, { useRef, useState } from "react";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firestore_database } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


const SignUpPage = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();

  const clickHandler = async () => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const usersCollection = collection(firestore_database, "users");
      const userData = {
        email: emailRef.current.value,
      };
      await addDoc(usersCollection, userData);

      navigate("/");
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", color: "white", fontSize: "24px", paddingTop: "2rem" }}>
      <div>
        <Input ref={emailRef} type="text">Email:</Input>
        <Input ref={passwordRef} type="password">Passwort (mindestens 6 Zeichen!):</Input>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>
          <Button onClick={clickHandler} className="button"> Konto erstellen → </Button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px" }}>
        {signUpError && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "15px", color: "red" }}>
            {signUpError}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
