import React, { useEffect } from "react";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Fade } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'
import axiosInstance from "../services/authHeader";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { Button, Typography } from '@mui/material'
import {
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from '@mui/x-data-grid';
const NULL_FIELD_MAGIC_NUMBER = -420.69

const billion = 1000000000
export function displayData(stock, i) {
    return (
        {
            id: i,
            ticker: stock.ticker === NULL_FIELD_MAGIC_NUMBER ? "N/A" : stock.ticker,
            companyName: stock.company_name,
            sector: stock.sector,
            currentPrice: stock.current_price === NULL_FIELD_MAGIC_NUMBER ? "N/A" : `$${stock.current_price}`,
            marketCap: stock.market_cap === NULL_FIELD_MAGIC_NUMBER ? "N/A" : `$${(stock.market_cap / billion).toFixed(2)}`,
            enterpriseValue: stock.enterprise_value === NULL_FIELD_MAGIC_NUMBER ? "N/A" : `$${(stock.enterprise_value / billion).toFixed(2)}`,
            forwardPE: stock.forward_pe === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.forward_pe / 1).toFixed(2),
            priceToBook: stock.price_to_book === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.price_to_book / 1).toFixed(2),
            priceToSales: stock.price_to_sales === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.price_to_sales / 1).toFixed(2),
            enterpriseToRev: stock.enterprise_to_rev === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.enterprise_to_rev / 1).toFixed(2),
            enterpriseToEbitda: stock.enterprise_to_ebitda === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.enterprise_to_ebitda / 1).toFixed(2),
            profitMargins: stock.profit_margins === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.profit_margins / 1).toFixed(2),
            roa: stock.roa === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.roa / 1).toFixed(2),
            roe: stock.roa === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.roe / 1).toFixed(2),
            leverage: stock.leverage === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.leverage / 1).toFixed(2),
            beta: stock.beta === NULL_FIELD_MAGIC_NUMBER ? "N/A" : (stock.beta / 1).toFixed(2)

        }
    )
}

const RelativeTable =({ stockData, averageData, updateAverageData, setStockData})=>{
    // const [row, setRow] = useState([])
    const { url } = useParams([])
    const [selectionModel, setSelectionModel] = useState([]);
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
            description: 'Forward Price/Earnings'
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
            description: 'Price/Sales'
        },
        {
            field: 'enterpriseToRev',
            headerName: 'EV/Rev',
            width: 80,
            type: 'number',
            description: 'Enterprise Value/Revenue'
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

    function CustomToolbar() {
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const setRows = (s) => {
        const r = []
        for (var i = 0; i < s.length; i++) {
            r.push(displayData(s[i], i))
        }
        return r
    }
    const row = setRows(stockData)



    const onRemove = (e) => {
        e.preventDefault()
        let s = []

        for (let i = 0; i < selectionModel.length; i++) {
            const stock = row.filter((stk) => (stk.id === selectionModel[i]))
            s.push(stock[0].ticker)
        }

        axiosInstance.put(`stock_api/relative_table/${url}/`, { stocks_to_remove: s })
            .then((res) => {
                setSelectionModel([])
                setStockData(res.data.stocks)
                updateAverageData(res.data.stocks)
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
            })
    }
    
    return(
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default RelativeTable