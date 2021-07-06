import { React, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { loginCheck } from '../redux/actionCreators';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
    alert: {
        padding: '0px',
        width: '100%',
    },
}));

const Login = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const regex = {
        email: '^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$', //eslint-disable-line
        password: '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$'
    }

    const [errorText, setErrorText] = useState({
        email: '',
        password: ''
    })

    const validateInput = (name, input) => {
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

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        props.loginCheck(user, function (token) {
            localStorage.setItem('token', token);
            history.push("/")
        })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} >
                <img src={process.env.PUBLIC_URL + '/assets/login.svg'} alt="login" />
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            onChange={handleChange('email')}
                            value={values.email}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={errorText.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
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
                        {(errorText.email) ?
                            <Alert className={classes.alert} severity="error">{errorText.email}</Alert> : <div></div>
                        }
                        {(errorText.password) ?
                            <Alert className={classes.alert} severity="error">{errorText.password}</Alert> : <div></div>
                        }
                        {(props.error) ?
                            <Alert className={classes.alert} severity="error">{props.error}</Alert> : <div></div>
                        }
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={clickSubmit}
                            disabled={(errorText.password || errorText.email) ? "true" : ""}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/password/forgot" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => {
    return {
        resume: state.resume,
        token: state.resume.token,
        error: state.resume.error,
    }
}

const mapDispatchToProps = dispatch => ({
    loginCheck: (props, callback) => { dispatch(loginCheck(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);