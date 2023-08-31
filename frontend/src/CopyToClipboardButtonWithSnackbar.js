// inspiriert von https://fwuensche.medium.com/react-button-to-copy-to-clipboard-75ef5ecdc708
import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';

const CopyToClipboardButtonWithSnackbar = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        navigator.clipboard.writeText(window.location.toString());
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClick}>Copy to Clipboard</Button>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Copied to clipboard"
            />
        </>
    );
};

export default CopyToClipboardButtonWithSnackbar;
