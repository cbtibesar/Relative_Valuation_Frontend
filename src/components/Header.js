import React from 'react'
import { AppBar, Typography } from '@material-ui/core'
import ToolBar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'rgba(147, 112, 219, 0.5)'
    },
    toolbarTitle: {
        flexGrow: 1,
    },
}))



function Header() {
    const classes = useStyles();
    return(
        <React.Fragment>
                <AppBar
                    position='static'
                    elevation={0}
                    className={classes.appBar}
                >
                    <ToolBar>
                        <Typography variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.toolbarTitle}>
                            Relative Valutation
                        </Typography>

                        <Button
                            href="#"
                        sx={{
                            backgroundColor: '#510B76', borderColor: '#510B76', color: 'white', '&:hover': {
                                backgroundColor: 'white',
                                borderColor: 'white',
                                color: '#510B76',
                                boxShadow: 'none',
                            },}}
                            variant="outlined"
                            component={NavLink}
                            to="/logout"
                        >
                            Logout
                        </Button>
                    </ToolBar>
                </AppBar>
        </React.Fragment>
    );
}

export default Header