import { DataGrid } from "@mui/x-data-grid"
import { Paper } from '@material-ui/core'
import React from "react"

const AverageTable = ({ averageData }) => {
    const columns = [
        {
            field: 'industry',
            headerName: 'Industry Averages',
            width: 150
        },
        {
            field: 'forwardPE',
            headerName: 'P/E',
            type: 'number',
            description: 'Forward Price/Earnings'
        },
        {
            field: 'priceToBook',
            headerName: 'P/B',
            type: 'number',
            description: 'Price/Book'
        },
        {
            field: 'priceToSales',
            headerName: 'P/S',
            type: 'number',
            description: 'Price/Sales'
        },
        {
            field: 'enterpriseToRev',
            headerName: 'EV/Rev',
            type: 'number',
            description: 'Enterprise Value/Revenue'
        },
        {
            field: 'enterpriseToEbitda',
            headerName: 'EV/EBITDA',
            type: 'number',
            description: 'Enterprise Value/EBITDA'
        },
        {
            field: 'profitMargins',
            headerName: 'Margins',
            type: 'number',
            description: 'Gross Profit Margins'
        },
        {
            field: 'roa',
            headerName: 'ROA',
            type: 'number',
            description: 'Return on Assets'
        },
        {
            field: 'roe',
            headerName: 'ROE',
            type: 'number',
            description: 'Return on Equity'
        },
        {
            field: 'leverage',
            headerName: 'Leverage',
            type: 'number',
            description: 'Debt/Equity'
        },

    ]



    return (
        <Paper elevation={4}>
            <DataGrid
                columns={columns}
                rows={averageData}
                pageSize={15}
                rowHeight={40}
                autoHeight
            />
        </Paper>
    )
}

export default AverageTable