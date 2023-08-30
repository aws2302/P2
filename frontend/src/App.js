import "./App.css";
import * as React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from '@mui/icons-material/Home';
import { blue } from "@mui/material/colors";
import BasicModal from "./modal";
import ModeSwitch from "./Switch";

/* Color Presets Button */
const primary = blue[700];
const accent_hover = blue[900];

import PersonIcon from "@mui/icons-material/Person";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useState } from "react";
import { fetchSomeData } from "./Api";


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
        <div className="div-P-Icon">
          <Button className="PersonIcon" aria-label="PersonIcon">
            <PersonIcon className="P-Icon" />
          </Button>
        </div>
        <div className="div-MS-Icon">
          <Button className="ModeSwitch" aria-label="ModeSwitchIcon">
            <ToggleOnOutlinedIcon className="MS-Icon" />
          </Button>
        </div>
        <div className="div-H-Icon">
          <Button className="HelpIcon" aria-label="HelpIcon">
            <HelpOutlineOutlinedIcon className="H-Icon" />
          </Button>
        </div>
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
              className="SendButton"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{
                backgroundColor: primary,
                "&:hover": { backgroundColor: accent_hover },
              }}
            >
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendClick}>
              Send
            </Button>
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
