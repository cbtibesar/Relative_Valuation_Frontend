import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../services/useAuth.js'
import { Grid, Link, Container, Avatar, Button, TextField, Typography } from '@mui/material';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState(Object.freeze({
        email:"",
        password:"",
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
        login(formData.email, formData.password).then(() => {
            navigate('/')
        })

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}/>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login