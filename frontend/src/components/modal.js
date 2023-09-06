import * as React from "react";
import "../components/css/App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #1976d2",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="div-HP-Icon">
            <Button className="HelpIcon" aria-label="HelpIcon" onClick={handleOpen}>
                <HelpOutlineOutlinedIcon className="HP-Icon" style={{ fontSize: '36px' }} />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Was ist Shorty?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Shorty ist ein URl- Shortner. <br />
                        Ewig lange URLs können mithilfe von Shorty in handliche kurze URLs umgewandelt werden!<br />
                        Einfach die lange URL in Feld einfügen und auf "Kürzen" klicken. Sofort wird die gekürzte URL angezeigt.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
