import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';


const DialogueBox =({ onAdd, handleClose, label, open, handleChange })=> {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label={label}
                    type="title"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Cancel</Button>
                <Button color="success" onClick={onAdd}>Add</Button>
            </DialogActions>
        </Dialog >
    )
}

export default DialogueBox
