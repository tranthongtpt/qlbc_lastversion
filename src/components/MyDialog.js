import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from '@mui/material/Modal';
const MyDialog = () =>{
  const [open, setOpen] = React.useState(true);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

return (
  <>
  <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Open form dialog
    </Button>
    < Modal open={open} handleClose={handleClose} />
  </div>
  </>
)
}

export default MyDialog;
