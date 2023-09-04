import "../components/css/chart.css";
import React from "react";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Routing from "../Routing";
import BasicModal from "../components/modal";
import ModeSwitch from "../components/Switch";
import TinyBar from "../components/tinybarchart";
import Chartpie from "../components/piechart";

export default function Stats() {
  /* Page redirect */
  const navigate = useNavigate();

  return (
    <div className="Stats">
      <header className="App-header">
        <div className="div-HS-Icon">
          <Button
            className="HomeIcon"
            aria-label="HomeIcon"
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon className="H-Icon" style={{ fontSize: "36px" }} />
          </Button>
          {/* <Button
            className="StatsIcon"
            aria-label="StatsIcon"
            onClick={() => {
              navigate("/stats");
            }}
          >
            <BarChartIcon className="S-Icon" style={{ fontSize: "36px" }} />
          </Button> */}
        </div>
        <div className="div-MS-Icon">{/* <ModeSwitch /> */}</div>
        <BasicModal />
      </header>
      {/* Body Section */}
      <div className="pie-body-url">
        <body className="App-Body">
          <h1>Shorty - URL Shortener</h1>
          <h3>
            Shorty ist der URL Shortner der Gruppe 3 aus dem Techstarter Kurs
            AWS 23-02.
          </h3>
          <div className="Tiny-Bar">
            <TinyBar />
            <Chartpie />
          </div>
          <div>
          </div>
        </body>
        </div>
        <div className="footer-url">
        <footer>
          <ul className="no-bullets">
          <li>Long URL: xxxx</li>
          <li>Short URL: xxxx</li>
          <li>Erstellt am: xx.xx.xxxx</li>
          <li>Klicks letzten 30 Tage: xxx</li>
          <li>Klicks insgesamt: xxxx</li>
          </ul>
        </footer>
        </div>
      </div>
  );
}
