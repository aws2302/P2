import React, { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "../layout/Button";

const Main = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });

    return () => {
      unsubscribe(); // Cleanup the subscription
    };
  }, [auth, navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div>
      <h1>Willkommen beim Backend!</h1>
      <Button onClick={handleLogout}>Logout</Button>
      
    </div>
  );
};

export default Main;
