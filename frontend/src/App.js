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

export default function App() {
  return (
    /* Head Section */
    <div className="App">
      <header className="App-header">
        <div className="div-H-Icon">
          <Button className="HomeIcon" aria-label="HomeIcon">
            <HomeIcon className="H-Icon" />
          </Button>
        </div>
        {/* To-Do
        Dark Mode implementieren */}
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
              label="Enter the link here "
              variant="outlined"
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
