import "../components/css/chart.css";
import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Routing from "../Routing";
import BasicModal from "../components/modal";
import ModeSwitch from "../components/Switch";
import TinyBar from "../components/tinybarchart";
import Chartpie from "../components/piechart";
import { useLocation } from 'react-router-dom';

function Stats({route}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jsonFileName = queryParams.get('jsonFile');

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    if (jsonFileName) {
      fetch(jsonFileName)
        .then((response) => response.json())
        .then((data) => {
          setJsonData(data);
        })
        .catch((error) => {
          console.error('Fehler beim Laden der JSON-Datei:', error);
        });
    }
  }, [jsonFileName]);

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
            <TinyBar data={location.state} />
            <Chartpie />
          </div>
          <div>
          </div>
        </body>
      </div>
      <div className="footer-url">
        <footer>
          <ul className="no-bullets">
            <li>Long URL: {location.state.longURL}</li>
            <li>Short URL: {location.state.shortURL}</li>
            <li>Erstellt am: {location.state.createDate}</li>
            <li>Klicks insgesamt: {location.state.clicks}</li>
          </ul>
        </footer>
      </div>
    </div>
  );
}

export default Stats;
