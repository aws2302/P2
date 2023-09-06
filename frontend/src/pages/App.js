import "../components/css/App.css";
import * as React from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import { blue } from "@mui/material/colors";
import BasicModal from "../components/modal";
import ModeSwitch from "../components/Switch";
import { useState } from "react";
import { fetchSomeData } from "../Api";
import ShortURL from "../components/ShortURL";
import Password from "../components/Password";
import { useNavigate } from "react-router-dom";
import PWDModal from "../components/pwdmodal";
import PWModal from "../components/PWModal";


/* Color Presets Button */
const primary = blue[700];
const accent_hover = blue[900];

export default function App() {
  const [url, setUrl] = useState(''); // URL speichern
  const [response, setResponse] = useState(null);
  const [passwordValue, setPasswordValue] = useState('');


  // Post-Anfrage ans Backend
  const handleSendClick = async () => {
    try {
      const requestData = { longUrl: url };

      // POST-Anfrage ans Backend
      console.warn(requestData)
      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Überprüfung
      if (!response.ok) {
        throw new Error('Fehler bei Anfrage');
      }

      // Antwort Backend als JSON
      const result = await response.json();

      // Antwort in die vorgesehenen Ausgabefelder übergeben
      setResponse(result.shortUrl);
      setPasswordValue(result.passwd);
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  /* Page redirect */
  const navigate = useNavigate();

  // Zürück zur Startseite
  const handleHomeIconClick = () => {
    window.location.href = '/';
  };

  return (
    /* Head Section */
    <div className="App">
      <header className="App-header">
        <div className="div-HS-Icon">
          <Button
            className="HomeIcon"
            aria-label="HomeIcon"
            onClick={handleHomeIconClick}
          >
            <HomeIcon className="H-Icon" style={{ fontSize: '36px' }} />
          </Button>
          <PWDModal />
        </div>
        <div className="div-MS-Icon">{/* <ModeSwitch /> */}</div>
        <BasicModal />
      </header>
      {/* Body Section */}
      <div className="body-url">
        <body className="App-Body">
          <h1>Shorty - URL Shortener</h1>
          <h3>
            Shorty ist der URL Shortner der Gruppe 3 aus dem Techstarter Kurs
            AWS 23-02.
          </h3>
          <div className="T-Field">
            <TextField
              id="outlined-basic"
              label="Enter the link here"
              variant="outlined"
              sx={{ width: '100%' }}
              value={url} // Textfeld wird ausgelesen
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              onClick={handleSendClick}
              className="SendButton"
              variant="contained"
              sx={{
                backgroundColor: primary,
                '&:hover': { backgroundColor: accent_hover },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Kürzen <SendIcon sx={{ marginLeft: '4px' }} />
            </Button>
          </div>
        </body>
      </div>
      {/* Bottom Section */}
      <div className="footer-url">
        <footer>
          {response && (
            <div>
              <PWModal />
              <p style={{ margin: '2px 0', textAlign: 'left' }}>
                Ihre Short-URL:
              </p>
              <ShortURL shortenLink={response} /> {/* Ausgabe Short-URL */}
            </div>
          )}
          {response && passwordValue && (
            <div>
              <div style={{ margin: '10px' }}></div>
              <p style={{ margin: '2px 0', textAlign: 'left' }}>
                Passwort zur Identifikation:
              </p>
              <Password value={passwordValue} /> {/* Ausgabe Password */}

            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
