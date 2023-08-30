import "./App.css";
import * as React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from '@mui/icons-material/Home';
import { blue } from "@mui/material/colors";
import BasicModal from "./modal";
import ModeSwitch from "./Switch";
import { useState } from "react";
import { fetchSomeData } from "./Api";

/* Color Presets Button */
const primary = blue[700];
const accent_hover = blue[900];



export default function App() {
  const [url, setUrl] = useState(''); // URL speichern
  const [response, setResponse] = useState(null);

  const handleSendClick = () => {
    // führt den API-Aufruf aus
    let result = fetchSomeData();
      // .then(result => {
      //   setResponse(result);
      // })
      // .catch(error => {
      //   console.error(error.message);
      // });
  };

  return (
    /* Head Section */
    <div className="App">
      <header className="App-header">
        <div className="div-H-Icon">
          <Button className="HomeIcon" aria-label="HomeIcon">
            <HomeIcon className="H-Icon" />
          </Button>
        </div>
        <div className="div-MS-Icon">
          <ModeSwitch />
        </div>
        <BasicModal />
      </header>
      {/* Body Section */}
      <div className="body-url">
        <body className="App-Body">
          <h1>Projekt - URL Shortener</h1>
          <h3>
            XXX is the World's Shortest Link Shortener service to track, brand,
            and share short URLs.
          </h3>
          <div className="T-Field">
            <TextField
              id="outlined-basic"
              label="Enter the link here"
              variant="outlined"
              value={url} // Textfeld wird ausgelesen
              onChange={e => setUrl(e.target.value)}
            />
            <Button
              onClick={handleSendClick}
              className="SendButton"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                backgroundColor: primary,
                "&:hover": { backgroundColor: accent_hover },
              }} 
              /> 
          </div>
        </body>
      </div>
      {/* Bottom Section */}
      <div className="footer-url">
        <footer>
          <h1>To-Do</h1>
          <p>Statisken(eingeloggt)</p>
        </footer>
      </div>
    </div>
  );
}
