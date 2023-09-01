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
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>{shortURL}</p>
                <Button
                    onClick={handleCopyClick}
                    variant="contained"
                    sx={{
                        backgroundColor: "#1976D2",
                        "&:hover": { backgroundColor: "#156CB3" },
                        marginLeft: "8px"
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

export default ShortURL;
