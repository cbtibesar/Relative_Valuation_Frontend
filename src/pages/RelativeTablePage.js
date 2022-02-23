import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../services/authHeader'
import { Stack, Paper, Button, IconButton, CircularProgress, Dialog } from '@mui/material';
import { Grid } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material';
import DialogueBox from '../components/DialogueBox';
import { displayData } from '../components/relativeTable'

import AverageTable from '../components/averageTable';
import IndustryAverageForm from '../components/industryAverageForm';
import RelativeTable from '../components/relativeTable';


const RelativeTablePage = () => {
    const [title, setTitle] = useState()
    const [averageData, setAverage] = useState()
    const [stockName, setStockName] = useState('')
    const [stockData, setStockData] = useState([])

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { url } = useParams([])


    const updateAverageData = (stocks) => {
        if (stocks.length > 0) {
            let numPE = 0, numEtR = 0, numEtE = 0, numPM = 0, numROE = 0, numLeverage = 0, numPB = 0, numROA = 0, numPS = 0
            let totalPE = 0, totalEtR = 0, totalEtE = 0, totalPM = 0, totalROE = 0, totalLeverage = 0, totalPB = 0, totalROA = 0, totalPS = 0

            for (let i = 0; i < stocks.length; i++) {
                const stock = displayData(stocks[i], i)
                if (stock.forwardPE !== "N/A") {
                    totalPE += stock.forwardPE/1
                    numPE += 1
                }
                if (stock.enterpriseToRev !== "N/A") {
                    totalEtR += stock.enterpriseToRev/1
                    numEtR += 1
                }
                if (stock.enterpriseToEbitda !== "N/A") {
                    totalEtE += stock.enterpriseToEbitda/1
                    numEtE += 1
                }
                if (stock.profitMargins !== "N/A") {
                    totalPM += stock.profitMargins/1
                    numPM += 1
                }
                if (stock.roe !== "N/A") {
                    totalROE += stock.roe/1
                    numROE += 1
                }
                if (stock.roa !== "N/A") {
                    totalROA += stock.roa/1
                    numROA += 1
                }
                if (stock.leverage !== "N/A") {
                    totalLeverage += stock.leverage/1
                    numLeverage += 1
                }
                if (stock.priceToBook !== "N/A") {
                    totalPB += stock.priceToBook/1
                    numPB += 1
                }
                if (stock.priceToSales !== "N/A") {
                    totalPS += stock.priceToSales/1
                    numPS += 1
                }

            }
            setAverage([{
                id:0,
                industry: 'Table Averages',
                forwardPE: (totalPE / numPE),
                enterpriseToRev: (totalEtR / numEtR),
                enterpriseToEbitda: (totalEtE / numEtE),
                profitMargins: (totalPM / numPM),
                roe: (totalROE / numROE),
                leverage: (totalLeverage / numLeverage),
                roa: (totalROA / numROA),
                priceToBook: (totalPB / numPB),
                priceToSales: (totalPS / numPS)
            },])
        } else { setAverage([]) }

    }


    useEffect(() => {
        axiosInstance.get(`stock_api/relative_table/${url}/`)
        .then((res) => {
            setStockData(res.data.stocks)
            updateAverageData(res.data.stocks)
            setTitle(res.data.title)
        })
    }, [])

    const clickAdd =(e)=> {
        e.preventDefault()
        setOpen(true)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setStockName(e.target.value.trim())
    }

    const handleClose = (e) => {
        e.preventDefault()
        setOpen(false)
        setStockName('')
    }

    const onAdd = (e) => {
        e.preventDefault()
        setStockName('')
        if (stockName !== '') {
            setLoading(true)
            setOpen(false)
            axiosInstance.patch(`stock_api/relative_table/${url}/`, {stocks:[stockName]})
                .then((res) => {
                    setStockName('')
                    setStockData(res.data.stocks)
                    updateAverageData(res.data.stocks)
                    setLoading(false)
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                    }
                    setLoading(false)
                })
        }
    }



    return(
        <div style={{ justifyContent: 'center', display: 'flex', padding: '10px' }}>
            <Grid container spacing={3}>
                <Grid item xs={10}>
                    <Stack spacing={2}>
                        <Paper elevation={4} sx={{ width: '100%', minHeight: '80px' }}>
                            <Stack direction='row'>
                                <Typography sx={{ textAlign: 'left', verticalAlign: 'center', mb: 3, mt: 3, ml: 3, minWidth: '25%' }} variant="h6" component="div">
                                    {title}
                                </Typography>
                                <div style={{ width: '85%' }} />
                                {
                                    loading ? <CircularProgress color='success' sx={{ height: '50%', verticalAlign: 'center', mb: 3, mt: 3, mr: 3 }} /> :
                                        <Button sx={{ height: '50%', mb: 3, mt: 3, mr: 3 }} color="success" variant="outlined" startIcon={<AddIcon />} onClick={clickAdd}>
                                            Add
                                        </Button>
                                }
                            </Stack>
                        </Paper>
                        {
                            averageData ?
                            <>
                                <RelativeTable stockData={stockData} averageData={averageData[0]} updateAverageData={updateAverageData} setStockData={setStockData} />
                                <AverageTable averageData={averageData} />
                            </>:<></>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <IndustryAverageForm setAverageData={setAverage} averageData={averageData} />
                </Grid>

            </Grid>
            <DialogueBox open={open} handleClose={handleClose} handleChange={handleChange} label={"Add stock (by ticker):"} onAdd={onAdd} />



            {/* <DialogueBox open={openTitleChange} handleClose={handleCloseTitle} handleChange={handleChangeTitle} label={"Relative Table Title"} onAdd={handleSubmitChangeTitle}/> */}
        </div>


    );
}
export default RelativeTablePage