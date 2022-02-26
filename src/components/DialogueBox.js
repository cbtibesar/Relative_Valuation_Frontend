import React from 'react'

import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';


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
