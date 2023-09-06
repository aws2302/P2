// inspiriert von https://fwuensche.medium.com/react-button-to-copy-to-clipboard-75ef5ecdc708
import React from 'react';
import { Button } from '@mui/material';

const CopyToClipboardButton = () => {
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.toString());
  };

  return <Button onClick={handleClick}>Copy to Clipboard</Button>;
};

export default CopyToClipboardButton;
