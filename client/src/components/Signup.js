import { React, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import { config } from '../config/config.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        padding: '0px',
        width: '100%',
    },
}));

export default function Signup() {
    const classes = useStyles();
    const history = useHistory();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        open: false,
        error: ''
    })

    const regex = {
        email: '^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$', //eslint-disable-line
        name: '^[A-Z][a-zA-Z]{1,}$',
        password: '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$'
    }

    const [errorText, setErrorText] = useState({
        email: '',
        lastName: '',
        firstName: '',
        password: ''
    })

    const validateInput = (name, input) => {
        if (name === 'firstName' || name === 'lastName') {
            if (!input.match(regex.name))
                setErrorText({ ...errorText, [name]: 'Invalid Name; Length > 2' })
            else setErrorText({ ...errorText, [name]: '' })
        }
        if (name === 'email') {
            if (!input.match(regex.email))
                setErrorText({ ...errorText, [name]: 'Invalid Email Id' })
            else setErrorText({ ...errorText, [name]: '' })
        }
        if (name === 'password') {
            if (!input.match(regex.password))
                setErrorText({ ...errorText, [name]: 'Password must be Alphanumeric, Min. Length 6' })
            else setErrorText({ ...errorText, [name]: '' })
        }
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        validateInput(name, event.target.value)
    }

    const goto = (res, user) => {
        if (res.status === 200) {
            history.push("/login", user)
        }
    }

    const create = async (user) => {
        try {
            let response = await fetch(`${config.REACT_APP_API_URL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            let res = await response.json()
            //console.log(res)
            goto(response, res.user)
            return response
        } catch (err) {
            console.log(err)
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="firstName"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                onChange={handleChange('firstName')}
                                value={values.firstName}
                                label="First Name"
                                error={errorText.firstName}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                onChange={handleChange('lastName')}
                                value={values.lastName}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                error={errorText.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                onChange={handleChange('email')}
                                value={values.email}
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={errorText.email}
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
                                onChange={handleChange('password')}
                                value={values.password}
                                autoComplete="current-password"
                                error={errorText.password}
                            />
                        </Grid>
                    </Grid>
                    {(errorText.firstName) ?
                        <Alert className={classes.alert} severity="error">{errorText.firstName}</Alert> : <div></div>
                    }
                    {(errorText.lastName) ?
                        <Alert className={classes.alert} severity="error">{errorText.lastName}</Alert> : <div></div>
                    }
                    {(errorText.email) ?
                        <Alert className={classes.alert} severity="error">{errorText.email}</Alert> : <div></div>
                    }
                    {(errorText.password) ?
                        <Alert className={classes.alert} severity="error">{errorText.password}</Alert> : <div></div>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={(errorText.firstName || errorText.lastName || errorText.password || errorText.email) ? "true" : ""}
                        onClick={clickSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}