import React, { useContext, useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import axiosInstance from '../axios'
import { Stack, Paper, Button, IconButton, CircularProgress, Dialog } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material';
import DialogueBox from './DialogueBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade } from '@mui/material';
import {
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from '@mui/x-data-grid';
import { UserContext } from '../UserContext';


const RelativeTablePage = () => {
    const [title, setTitle] = useState()
    const { user } = useContext(UserContext)
    const [averageData, setAverage] = useState([])
    const [stockName, setStockName] = useState()
    const [selectionModel, setSelectionModel] = useState([]);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { url } = useParams([])
    const [row, setRow] = useState([])

    const NULL_FIELD_MAGIC_NUMBER = -420.69
    const billion = 1000000000

    function CustomToolbar() {
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns = [
        {
            field: 'ticker',
            headerName: 'Ticker',
            width: 80
        },
        {
            field: 'companyName',
            headerName: 'Company Name',
            width: 150
        },
        {
            field: 'sector',
            headerName: 'Sector',
            width: 150
        },
        {
            field: 'currentPrice',
            headerName: 'Current Price',
            width: 120,
            type: 'number'
        },
        {
            field: 'marketCap',
            headerName: 'Market Cap',
            type: 'number',
            description: 'Market Cap in billions'
        },
        {
            field: 'enterpriseValue',
            headerName: 'EV',
            type: 'number',
            width: 90,
            description: 'Enterprise Value in billions'
        },
        {
            field: 'forwardPE',
            headerName: 'P/E',
            width: 80,
            type: 'number',
            description:'Forward Price/Earnings'
        },
        {
            field: 'priceToBook',
            headerName: 'P/B',
            width: 65,
            type: 'number',
            description: 'Price/Book'
        },
        {
            field: 'priceToSales',
            headerName: 'P/S',
            width: 65,
            type: 'number',
            description:'Price/Sales'
        },
        {
            field: 'enterpriseToRev',
            headerName: 'EV/Rev',
            width: 80,
            type: 'number',
            description:'Enterprise Value/Revenue'
        },
        {
            field: 'enterpriseToEbitda',
            headerName: 'EV/EBITDA',
            width: 90,
            type: 'number',
            description: 'Enterprise Value/EBITDA'
        },
        {
            field: 'profitMargins',
            headerName: 'Margins',
            width: 80,
            type: 'number',
            description: 'Gross Profit Margins'
        },
        {
            field: 'roa',
            headerName: 'ROA',
            width: 65,
            type: 'number',
            description: 'Return on Assets'
        },
        {
            field: 'roe',
            headerName: 'ROE',
            width: 65,
            type: 'number',
            description: 'Return on Equity'
        },
        {
            field: 'leverage',
            headerName: 'Leverage',
            width: 90,
            type: 'number',
            description: 'Debt/Equity'
        },
        {
            field: 'beta',
            headerName: 'Beta',
            width: 80,
            type: 'number'
        }
    ]


    const displayData = (stock, i) => {
        return (
            {
                id: i, ticker: stock.ticker, companyName: stock.company_name, sector: stock.sector, currentPrice: `$${stock.current_price}`, marketCap: `$${(stock.market_cap / billion).toFixed(2)}`, enterpriseValue: `$${(stock.enterprise_value / billion).toFixed(2)}`,
                forwardPE: (stock.forward_pe / 1).toFixed(2), priceToBook: (stock.price_to_book / 1).toFixed(2), priceToSales: (stock.price_to_sales / 1).toFixed(2), enterpriseToRev: (stock.enterprise_to_rev / 1).toFixed(2), enterpriseToEbitda: (stock.enterprise_to_ebitda / 1).toFixed(2),
                profitMargins: (stock.profit_margins / 1).toFixed(2), roa: (stock.roa / 1).toFixed(2), roe: (stock.roe / 1).toFixed(2), leverage: (stock.leverage / 1).toFixed(2), beta: (stock.beta / 1).toFixed(2)

            }
        )
    }

    const setRows = (s) => {
        const r= []
        for (var i = 0; i < s.length; i++) {
            r.push(displayData(s[i], i))
        }
        setRow(r)
    }

    const updateAverageData = (stocks) => {
        if (stocks.length > 0) {
            let numPE = 0, numEtR = 0, numEtE = 0, numPM = 0, numROE = 0, numLeverage = 0, numPB = 0, numROA = 0, numPS = 0
            let totalPE = 0, totalEtR = 0, totalEtE = 0, totalPM = 0, totalROE = 0, totalLeverage = 0, totalPB = 0, totalROA = 0, totalPS = 0

            for (let i = 0; i < stocks.length; i++) {
                const stock = displayData(stocks[i], i)
                if (stock.forwardPE !== NULL_FIELD_MAGIC_NUMBER) {
                    totalPE += stock.forwardPE/1
                    numPE += 1
                }
                if (stock.enterpriseToRev !== NULL_FIELD_MAGIC_NUMBER) {
                    totalEtR += stock.enterpriseToRev/1
                    numEtR += 1
                }
                if (stock.enterpriseToEbitda !== NULL_FIELD_MAGIC_NUMBER) {
                    totalEtE += stock.enterpriseToEbitda/1
                    numEtE += 1
                }
                if (stock.profitMargins !== NULL_FIELD_MAGIC_NUMBER) {
                    totalPM += stock.profitMargins/1
                    numPM += 1
                }
                if (stock.roe !== NULL_FIELD_MAGIC_NUMBER) {
                    totalROE += stock.roe/1
                    numROE += 1
                }
                if (stock.roa !== NULL_FIELD_MAGIC_NUMBER) {
                    totalROA += stock.roa/1
                    numROA += 1
                }
                if (stock.leverage !== NULL_FIELD_MAGIC_NUMBER) {
                    totalLeverage += stock.leverage/1
                    numLeverage += 1
                }
                if (stock.priceToBook !== NULL_FIELD_MAGIC_NUMBER) {
                    totalPB += stock.priceToBook/1
                    numPB += 1
                }
                if (stock.priceToSales!== NULL_FIELD_MAGIC_NUMBER) {
                    totalPS += stock.priceToSales/1
                    numPS += 1
                }

            }
            setAverage({
                forwardPE: (totalPE / numPE),
                enterpriseToRev: (totalEtR / numEtR),
                enterpriseToEbitda: (totalEtE / numEtE),
                profitMargins: (totalPM / numPM),
                roe: (totalROE / numROE),
                leverage: (totalLeverage / numLeverage),
                roa: (totalROA / numROA),
                priceToBook: (totalPB / numPB),
                priceToSales: (totalPS / numPS)
            })
        } else { setAverage([]) }

    }


    useEffect(() => {
        axiosInstance.get(`stock_api/relative_table/${url}/`)
        .then((res) => {
            setRows(res.data.stocks)
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
        setOpen(false)
        setStockName('')
        setLoading(true)
        if (stockName !== '') {
            axiosInstance.patch(`stock_api/relative_table/${url}/`, {stocks:[stockName]})
                .then((res) => {
                    setRows(res.data.stocks)
                    updateAverageData(res.data.stocks)
                    setLoading(false)
                }).catch(function (error) {
                    if (error.response) {
                        console.log(error.response)
                    }
                })
        }
    }

    const onRemove =(e)=> {
        e.preventDefault()
        let s =[]

        for (let i = 0; i < selectionModel.length; i++) {
            const stock = row.filter((stk) => (stk.id === selectionModel[i]))
            s.push(stock[0].ticker)
        }

        axiosInstance.put(`stock_api/relative_table/${url}/`, {stocks_to_remove: s})
            .then((res) => {
                setSelectionModel([])
                setRows(res.data.stocks)
                updateAverageData(res.data.stocks)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
            })
    }



    if(!user){
        <Navigate to="/login"/>
    }
    else{
        return(
            <div style={{ justifyContent: 'center', display: 'flex', padding: '10px' }}>
                <Stack spacing={2} sx={{ width: '90%' }}>
                    <Paper elevation={4} sx={{ width: '100%' }}>
                        <Stack direction='row'>
                            <Typography sx={{ textAlign: 'left', verticalAlign: 'center', mb: 3, mt: 3, ml: 3 }} variant="h6" component="div">
                                {title}
                            </Typography>
                            <div style={{ width: '85%' }} />
                            <Stack direction='row' spacing={1} sx={{ padding: 2 }}>
                                {
                                    loading ? <CircularProgress color='success' /> :
                                        <Button color="success" variant="outlined" startIcon={<AddIcon />} onClick={clickAdd}>
                                            Add
                                        </Button>
                                }
                            </Stack>
                        </Stack>
                    </Paper>
                    {
                        row.length > 0 ? <Paper elevation={4} sx={{
                            width: '100%', height: 'flex',

                            '& .green': {
                                backgroundColor: 'rgba(0, 128, 0, 0.5)',
                                color: 'black',
                                textAlign: 'center',
                            },
                            '& .red': {
                                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                                color: 'black',
                                textAlign: 'center',
                            },
                        }}>
                            <DataGrid
                                rows={row}
                                columns={columns}
                                onSelectionModelChange={(newSelectionModel) => {
                                    setSelectionModel(newSelectionModel);
                                }}
                                selectionModel={selectionModel}
                                components={{ Toolbar: CustomToolbar }}
                                getCellClassName={
                                    (params) => {
                                        if (params.field === 'forwardPE') {
                                            return params.value <= averageData.forwardPE / 1 ? 'green' : 'red'
                                        } else if (params.field === 'priceToBook') {
                                            return params.value <= averageData.priceToBook / 1 ? 'green' : 'red'
                                        } else if (params.field === 'priceToSales') {
                                            return params.value <= averageData.priceToSales / 1 ? 'green' : 'red'
                                        } else if (params.field === 'enterpriseToRev') {
                                            return params.value <= averageData.enterpriseToRev / 1 ? 'green' : 'red'
                                        } else if (params.field === 'enterpriseToEbitda') {
                                            return params.value <= averageData.enterpriseToEbitda / 1 ? 'green' : 'red'
                                        } else if (params.field === 'profitMargins') {
                                            return params.value >= averageData.profitMargins / 1 ? 'green' : 'red'
                                        } else if (params.field === 'roa') {
                                            return params.value >= averageData.roa / 1 ? 'green' : 'red'
                                        } else if (params.field === 'roe') {
                                            return params.value >= averageData.roe / 1 ? 'green' : 'red'
                                        } else if (params.field === 'leverage') {
                                            return params.value >= averageData.leverage / 1 ? 'green' : 'red'
                                        } else {
                                            return ''
                                        }
                                    }
                                }
                                pageSize={15}
                                rowHeight={40}
                                rowsPerPageOptions={[15]}
                                checkboxSelection
                                disableSelectionOnClick
                                autoHeight
                                sx={{ height: "100%" }}
                            />
                        </Paper> :
                            <Typography variant='h6' textAlign='center'>
                                Add company to get started!
                            </Typography>
                    }


                    <div style={{ width: '10%' }}>
                        <Fade in={selectionModel.length > 0}>
                            <Button color='error' variant='contained' startIcon={<DeleteIcon />} onClick={onRemove}>
                                Remove
                            </Button>
                        </Fade>
                    </div>
                </Stack>
                <DialogueBox open={open} handleClose={handleClose} handleChange={handleChange} label={"Add stock (by ticker):"} onAdd={onAdd} />
            </div>
        );
    }


}
export default RelativeTablePage