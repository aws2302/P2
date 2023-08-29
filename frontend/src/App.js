import "./App.css";
import * as React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { yellow } from "@mui/material/colors";
import BasicModal from "./modal"

/* Color Presets */
const primary = yellow[700];
const accent_hover = yellow[800];

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        {/* TO-DO 
        Modal anzeigen lassen */}
        <div className="div-H-Icon">
          <Button className="HelpIcon" aria-label="HelpIcon" onClick={BasicModal}>
            <HelpOutlineOutlinedIcon className="H-Icon" />
          </Button>
        </div>
      </header>
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
      <div className="footer-url">
        <footer>
          <h1>To-Do</h1>
          <p>Statisken(eingeloggt)</p>
        </footer>
      </div>
    </div>
      );
    }