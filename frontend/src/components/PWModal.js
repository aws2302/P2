import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const PWModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton color="primary" aria-label="help" onClick={handleOpen}>
        <HelpOutlineOutlinedIcon
          className="HP-Icon"
          style={{ fontSize: '24px' }}
        />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wofür bruache ich das Passwort zur Identifikation?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Um in Ihre Daten Einblick zu erhalten.
            <br />
            Klicken Sie einfach oben links auf das Statistik Symbol und geben
            Sie die Short-URL und das Passwort ein.
            <br />
            Damit gelangen Sie in den Statsitik bereichen und erhalten weitere
            spannende Daten zu Ihrer Short-URL.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PWModal;
