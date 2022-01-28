import { Grid, Typography } from '@mui/material'
import React from 'react'
const industryAverageForm =()=> {
    return(
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Enter Industry Averages
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextArea
                        required
                        id="industry"
                        name="industry"
                        label="Industry"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="pe"
                        name="pe"
                        label="Price/Earnings"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="ps"
                        name="ps"
                        label="Price/Sales"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="pb"
                        name="pb"
                        label="Price/Book"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="ev_rev"
                        name="ev_rev"
                        label="EV/Rev"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="ev_ebitda"
                        name="ev_ebitda"
                        label="EV/EBITDA"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="profit_margins"
                        name="profit_margins"
                        label="Profit Margins"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="asset_turnover"
                        name="asset_turnover"
                        label="Asset Turn"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="roe"
                        name="roe"
                        label="ROE"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextArea
                        id="roa"
                        name="roa"
                        label="ROA"
                        fullWidth
                        variant="standard" />
                </Grid>
            </Grid>
        </React.Fragment>

    )
}

export default industryAverageForm
