import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../layout/Input";
import Button from "../layout/Button";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firestore_db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const SignUpPage = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for the file input


  const clickHandler = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = userCredential.user;


      const usersCollection = collection(firestore_db, "users");
      const userData = {
        email: user.email,
      };
      await addDoc(usersCollection, userData);

      navigate("/dashboard");
    } catch (error) {
      setSignUpError(error.message);
    }
  };


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", color: "white", fontSize: "24px", paddingTop: "2rem" }}>
      <Link to="/impressum" style={{ fontSize: "25px", position: "absolute", bottom: "5rem", left: "7.5rem", color: "white", textDecoration: "none" }}>
        Impressum
      </Link>
      <div>
        <h1 style={{ textAlign: "center" }}>Sign Up...</h1>
        <h2 style={{ textAlign: "center", marginTop: "15px", marginBottom: "15px" }}>It's free!</h2>
        <Input ref={emailRef} type="text">Email:</Input>
        <Input ref={passwordRef} type="password">Passwort (mindestens 6 Zeichen!):</Input>
        
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "25px", textAlign: "center" }}>
          <Button onClick={clickHandler} className="button"> Konto erstellen → </Button>
        </div>
        
      </div>
          </div>
  );
};

export default SignUpPage;
