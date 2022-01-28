import { DataGrid } from "@mui/x-data-grid"
import React from "react"

const AverageTable =({ averageData })=> {
    const columns = [
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

    return(
        <DataGrid
            columns={columns}
            rows={averageData}
            pageSize={15}
            rowHeight={40}
            autoHeight
        />
    )
}

export default AverageTable