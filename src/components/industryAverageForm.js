import { Grid, Typography } from '@mui/material'
import { Paper, TextField } from '@material-ui/core'
import { useState } from 'react'
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Fade  } from '@mui/material';
import { Stack } from '@mui/material';

const IndustryAverageForm =({ setAverageData })=> {

    const [formData, setFormData] = useState(Object.freeze({
        industry: "",
        pe: "",
        ps: "",
        pb: "",
        ev_rev: "",
        ev_ebitda: "",
        profit_margins: "",
        asset_turnover: "",
        roe: "",
        roa: ""
    }))

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return(
        <React.Fragment>
            <Stack spacing={2}>
                <Paper elevation={4}>
                    <Typography variant='h6' textAlign='center' paddingTop={2}>
                        Enter Industry Averages
                    </Typography>
                    <Grid container spacing={3} padding={4}>
                        <Grid item xs={6}>
                            <TextField
                                required
                                id="industry"
                                name="industry"
                                label="Industry"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="pe"
                                name="pe"
                                label="Price/Earnings"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="ps"
                                name="ps"
                                label="Price/Sales"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="pb"
                                name="pb"
                                label="Price/Book"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="ev_rev"
                                name="ev_rev"
                                label="EV/Rev"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="ev_ebitda"
                                name="ev_ebitda"
                                label="EV/EBITDA"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="profit_margins"
                                name="profit_margins"
                                label="Margins"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="asset_turnover"
                                name="asset_turnover"
                                label="Asset Turn"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="roe"
                                name="roe"
                                label="ROE"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="roa"
                                name="roa"
                                label="ROA"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Paper>

                <Fade in={formData.industry.length > 0}>
                    <Button color='success' variant='contained' startIcon={<AddIcon />} onClick={handleSubmit}>
                        Add
                    </Button>
                </Fade>
            </Stack>
        </React.Fragment>

    )
}

export default IndustryAverageForm
