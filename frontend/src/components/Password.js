import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';

const Password = ({ value }) => {
  const [passwordValue, setPasswordValue] = useState(value);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(passwordValue);
    setIsSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Design für die Ausgabe
  const containerStyle = {
    width: '200px',
    height: '40px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    backgroundColor: '#F0F0F0',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const textStyle = {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div className="password">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={containerStyle}>
          <p style={textStyle}>{passwordValue}</p>
        </div>
        <Button
          onClick={handleCopyClick}
          variant="contained"
          sx={{
            backgroundColor: '#1976D2',
            '&:hover': { backgroundColor: '#156CB3' },
            marginLeft: '8px',
          }}
        >
          Kopieren
        </Button>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="In Zwischenablage kopiert"
      />
    </div>
  );
};

export default Password;
