import React from "react";
import Button from "../layout/Button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "darkgrey",
        fontSize: "24px",
        paddingTop: "5rem",
        backgroundColor: "darkgrey",
      }}
    >
         <div>
            <h3 style={{color: "azure", marginBottom: "20px"}}>Den Button platziert man dann da wo man ihn braucht.</h3>
          <Button onClick={() => navigate("/account")} style={{ aligItems: "center", marginTop: "20px", textAlign: "center" }}> Account → </Button>
          <Button onClick={() => navigate("/history")} style={{ aligItems: "center", marginTop: "20px", textAlign: "center" }}> Ohne Account → </Button>
          </div>
        </div>
  );
}

export default HomePage;
