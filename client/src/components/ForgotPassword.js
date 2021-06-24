import { React, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
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
}));

export default function ForgotPassword() {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();

    const [values, setValues] = useState({
        email: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const goto = (res) => {
        //console.log("result:",res);

        if (res.status === 200) {

            alert.success("Please check your mail for password reset link");
            alert.info("Redirecting you to login page")
            setTimeout(() => {
                history.push("/login");
            }, 2000);

        } else {
            alert.error("Invalid Email");
        }
    }



    const create = async (user) => {
        try {
            let response = await fetch(`${config.REACT_APP_API_URL}/api/password/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            goto(response);

            return response
        } catch (err) {
            console.log(err)
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: values.email || undefined,
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
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot Password?
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>

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
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={clickSubmit}
                    >
                        Reset
                    </Button>
                </form>
            </div>
        </Container>
    );
}