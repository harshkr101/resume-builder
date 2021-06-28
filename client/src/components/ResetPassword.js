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
import { useLocation } from "react-router-dom";
import jwt from 'jsonwebtoken';
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

export default function ResetPassword() {
    const classes = useStyles();
    const history = useHistory();
    const alert = useAlert();
    const query = useQuery();

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        open: false,
        error: ''
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const getToken = () => {
        let token = query.get("token");
        return token;
    }

    const verifyToken = (token) => {
        jwt.verify(getToken(), 'resume', function (err, decoded) {
        });
    }



    const goto = (res) => {
        //console.log("result:",res);

        if (res.status === 200) {

            alert.success("Password reset successfull");
            alert.info("Redirecting you to login page")
            setTimeout(() => {
                history.push("/login");
            }, 2000);

        } else {
            alert.error("Invalid token");
        }
    }



    const create = async (user) => {
        try {
            let response = await fetch(`${config.REACT_APP_API_URL}/api/password/reset`, {
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

        const token = getToken();
        const payload = jwt.decode(token);
        const userEmail = payload.email;

        const user = {
            password: values.password || undefined,
            email: userEmail || undefined,
            token: token || undefined
        }

        if (verifyToken()) {
            create(user).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true })
                }
            })
        } else {
            alert.error("Invalid token");
            setTimeout(() => {
                history.push("/login");
            }, 2000);
        }


    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                onChange={handleChange('password')}
                                value={values.password}
                                label="Password"
                                name="password"
                                autoComplete="password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmPassword"
                                onChange={handleChange('confirmPassword')}
                                value={values.confirmPassword}
                                label="Confirm Password"
                                name="confirmPassword"
                                autoComplete="Confirm Password"
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