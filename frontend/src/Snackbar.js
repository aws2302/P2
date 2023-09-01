// inspiriert von https://fwuensche.medium.com/react-button-to-copy-to-clipboard-75ef5ecdc708
import React, { useState } from 'react';
import { Snackbar, Button } from '@mui/material';

const CustomSnackbar = ({ message, snackbarText }) => { 
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(message);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClick}>Kopieren</Button>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={snackbarText}
            />
        </>
    );
};

export default CustomSnackbar;

