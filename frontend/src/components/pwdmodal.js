import * as React from 'react';
import '../components/css/App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BarChartIcon from '@mui/icons-material/BarChart';
import { TextField } from '@mui/material';
import { blue } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const primary = blue[700];
const accent_hover = blue[900];

export default function PWDModal() {
  const [open, setOpen] = React.useState(false);
  const [shortURL, setShortURL] = useState('');
  const [Password, setPassword] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    // Daten mit dem Backend überprüfen
    axios
      .post('http://localhost:8080/api/stats/1234567', { shortURL, Password }) // Annahme: Der Server hat eine Route "/api/checkPassword" zum Überprüfen der Daten
      .then((response) => {
        if (response.data.isValid) {
          // Wenn die Daten korrekt sind, zur Statistikseite weiterleiten
          navigate('/stats');
        } else {
          alert('Falsche shortURL oder Passwort. Bitte versuchen Sie es erneut.');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Überprüfen der Daten:', error);
        alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      });
  };

  return (
    <div className="div-HS-Icon">
      <Button className="StatsIcon" aria-label="StatsIcon" onClick={handleOpen}>
        <BarChartIcon className="S-Icon" style={{ fontSize: '36px' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={'center'}
            padding={'10px'}
          >
            - Kurz-URl Password -
          </Typography>
          <TextField
            id="outlined-basic-url"
            label="Kurz-URL hier eingeben"
            variant="outlined"
            sx={{
              justifyContent: 'center',
            }}
            value={shortURL}
            onChange={(e) => setShortURL(e.target.value)}
          />
          <TextField
            id="outlined-basic-password"
            label="Passwort hier eingeben"
            variant="outlined"
            sx={{
              justifyContent: 'center',
            }}
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="SendButton"
            variant="contained"
            sx={{
              backgroundColor: primary,
              '&:hover': { backgroundColor: accent_hover },
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '1vh',
              marginLeft: '10px',
            }}
            onClick={handleContinue}
          >
            weiter <SendIcon sx={{ marginLeft: '4px' }} />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
