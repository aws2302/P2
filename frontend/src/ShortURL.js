import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";

const ShortURL = ({ shortenLink }) => {
    const [shortURL, setShortURL] = useState(shortenLink);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleCopyClick = () => {
        navigator.clipboard.writeText(shortURL);
        setIsSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <div className="result">
            <p>{shortURL}</p>
            <Button onClick={handleCopyClick}>Copy</Button>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                message="Short URL copied to clipboard"
            />
        </div>
    );
};

export default ShortURL;
