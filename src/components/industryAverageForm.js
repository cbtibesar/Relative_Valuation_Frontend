import { Grid, Typography } from '@mui/material'
import { Paper, TextField } from '@material-ui/core'
import { useState } from 'react'
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Fade } from '@mui/material';
import { Stack } from '@mui/material';

const IndustryAverageForm = ({ averageData, setAverageData }) => {

    let id = 1
    const [formData, setFormData] = useState(Object.freeze({
        id: id,
        industry: "",
        forwardPE: "",
        priceToBook: "",
        priceToSales: "",
        enterpriseToRev: "",
        enterpriseToEbitda: "",
        profitMargins: "",
        leverage: "",
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
        setAverageData([...averageData, formData])
        id += 1
    }

    return (
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
                                id="forwardPE"
                                name="forwardPE"
                                label="Price/Earnings"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="priceToSales"
                                name="priceToSales"
                                label="Price/Sales"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="priceToBook"
                                name="priceToBook"
                                label="Price/Book"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="enterpriseToRev"
                                name="enterpriseToRev"
                                label="EV/Rev"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="enterpriseToEbitda"
                                name="enterpriseToEbitda"
                                label="EV/EBITDA"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="profitMargins"
                                name="profitMargins"
                                label="Margins"
                                fullWidth
                                variant="standard"
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="leverage"
                                name="leverage"
                                label="Leverage"
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