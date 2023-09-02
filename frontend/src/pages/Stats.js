import "../components/css/App.css";
import React from "react";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Routing from "../Routing";
import TinyBar from "../components/tinybarchart";
import Chartpie from "../components/piechart";

export default function Stats() {
  /* Page redirect */
  const navigate = useNavigate();

  return (
    <div className="Stats">
      <header className="App-header">
        <div className="div-HS-Icon">
      <Button className="HomeIcon" aria-label="HomeIcon" onClick={() => {
          navigate("/");
        }}>
        <HomeIcon className="H-Icon" style={{ fontSize: "36px" }} />
      </Button>
      </div>
      </header>
      <div className="body-url">
      <body className="App-Body">
        <div className="Tiny-Bar">
          <TinyBar style={{}} />
        </div>
        <div className="Pie-Chart">
          <Chartpie />
          </div>
      </body>
      </div>
      <div className="footer-url">
      <footer>
        <div>
          <h1>
        Footer
          </h1>
        </div>
      </footer>
      </div>
    </div>
  );
}
