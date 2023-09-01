import "./App.css";
import * as React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import { blue } from "@mui/material/colors";
import BasicModal from "./modal";
import ModeSwitch from "./Switch";
import { useState } from "react";
import { fetchSomeData } from "./Api";
import ShortURL from "./ShortURL";
import Password from "./Password";


/* Color Presets Button */
const primary = blue[700];
const accent_hover = blue[900];


export default function App() {
  const [url, setUrl] = useState(''); // URL speichern
  const [response, setResponse] = useState(null);
  const [passwordValue, setPasswordValue] = useState('');

  const handleSendClick = async () => {
    try {
      // führt den API-Aufruf aus
      const result = await fetchSomeData();

      setResponse(result.shortURL);
      setPasswordValue(result.password);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    /* Head Section */
    <div className="App">
      <header className="App-header">
        <div className="div-HS-Icon">
          <Button className="HomeIcon" aria-label="HomeIcon">
            <HomeIcon className="H-Icon" style={{ fontSize: '36px' }} />
          </Button>
          <Button className="StatsIcon" aria-label="StatsIcon">
            <BarChartIcon className="S-Icon" style={{ fontSize: '36px' }} />
          </Button>
        </div>
        <div className="div-MS-Icon">
          {/* <ModeSwitch /> */}
        </div>
        <BasicModal />
      </header>
      {/* Body Section */}
      <div className="body-url">
        <body className="App-Body">
          <h1>Shorty - URL Shortener</h1>
          <h3>
            Shorty ist der URL Shortner der Gruppe 3 aus dem Techstarter Kurs AWS 23-02.
          </h3>
          <div className="T-Field">
            <TextField
              id="outlined-basic"
              label="Enter the link here"
              variant="outlined"
              sx={{ width: '100%' }}
              value={url} // Textfeld wird ausgelesen
              onChange={e => setUrl(e.target.value)}
            />
            <Button
              onClick={handleSendClick}
              className="SendButton"
              variant="contained"
              sx={{
                backgroundColor: primary,
                "&:hover": { backgroundColor: accent_hover },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Kürzen <SendIcon sx={{ marginLeft: "4px" }} />
            </Button>
          </div>
        </body>
      </div>
      {/* Bottom Section */}
      <div className="footer-url">
        <footer>
          {response && (
            <ShortURL shortenLink={response} /> // Ausgabe Short-URL
          )}
          {response && passwordValue && (
            <div style={{ margin: '10px' }}></div> 
          )}
          {passwordValue && (
            <Password value={passwordValue} /> // Ausgabe Password
          )}
        </footer>
      </div>
    </div>
  );
}
