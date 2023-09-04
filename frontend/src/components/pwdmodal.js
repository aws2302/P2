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

/* Color Presets Button */
const primary = blue[700];
const accent_hover = blue[900];

export default function PWDModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* Page redirect */
  const navigate = useNavigate();

  /* PWD Check for redirect */

  function pwdCheck(){
    var TextField=document.getElementById("input-TextField").value;
   if(TextField==="Test")
       useNavigate="/site";
       
   
    else{
        alert("invaild code")
   }
}  

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
            id="outlined-basic"
            label="Kurz-URL hier eingeben"
            variant="outlined"
            sx={{
              justifyContent: 'center',
            }}
          />
          <TextField
            id="outlined-basic"
            label="Passwort hier eingeben"
            variant="outlined"
            sx={{
              justifyContent: 'center',
            }}
          />
          <Button
            // onClick={}
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
          >
            weiter <SendIcon sx={{ marginLeft: '4px' }} />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
