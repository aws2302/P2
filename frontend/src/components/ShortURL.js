import React, { useState } from "react";
import { Button, Snackbar } from "@mui/material";

const ShortURL = ({ shortenLink }) => {
    const [shortURL, setShortURL] = useState(shortenLink);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleCopyClick = () => {
        const baseUrl = 'http://localhost:8080'; // Basis-URL zum URL-Shortner
        const fullURL = `${baseUrl}/${shortURL}`;
        navigator.clipboard.writeText(fullURL);
        setIsSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    const shortURLContainer = {
        width: "200px",
        height: "40px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        backgroundColor: "#F0F0F0",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    const shortURLText = {
        margin: 0,
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    return (
        <div className="result">
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={shortURLContainer}>
                    <p style={shortURLText}>{shortURL}</p>
                </div>
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
