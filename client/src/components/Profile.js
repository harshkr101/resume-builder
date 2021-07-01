import React, { useState } from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { fetchData, updateUser } from '../redux/actionCreators';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(4)
    },
    container: {
        maxWidth: '50%',
        marginLeft: '25%',
        marginRight: '0',
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            marginLeft: 'unset',
        },
    },
    paper: {
        //marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));


const Dashboard = (props) => {
    const classes = useStyles();
    const token = localStorage.getItem('token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));
    //console.log(user)

    const [values, setValues] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    })

    React.useEffect(() => {
        props.fetchData(props.token, function () {
            //history.push("/builder")
        })
    }, []) //eslint-disable-line

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            firstName: values.firstName || undefined,
            lastName: values.lastName || undefined,
            email: values.email || undefined,
        }
        //console.log(user, props.token)
        props.updateUser(user, props.token)
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Personal Details
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
                            Update Details
                        </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )

}

const mapStateToProps = state => {
    return {
        resume: state.resume,
        token: state.resume.token
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    updateUser: (user, token) => { dispatch(updateUser(user, token)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);