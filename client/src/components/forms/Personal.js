import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { setPersonalDetails } from '../../redux/actionCreators';

const useStyles = makeStyles((theme) => ({
    line: {
        height: '10px',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '35px',
        marginBottom: '35px',
        border: 'none',
        backgroundColor: theme.palette.primary.main,
        opacity: '0.75',
        width: '100%'
    },
    alert: {
        padding: '0px',
        width: '100%',
    },
    alertHalf: {
        padding: '0px',
        width: '50%',
    },
}));

function PersonalForm(props) {

    const classes = useStyles();

    const regex = {
        email: /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, //eslint-disable-line
        name: /^[A-Z][a-zA-Z]{1,}$/,
        website: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/, //eslint-disable-line
        phone: /^\d{6,}$/
    }

    const [errorText, setErrorText] = useState({
        email: '',
        firstName: '',
        lastName: '',
        website: '',
        phone: ''
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
        if (name === 'phone') {
            if (!input.match(regex.phone))
                setErrorText({ ...errorText, [name]: 'Invalid Phone No., Min. Length 6' })
            else setErrorText({ ...errorText, [name]: '' })
        }
        if (name === 'website') {
            if (!input.match(regex.website))
                setErrorText({ ...errorText, [name]: 'Invalid Link' })
            else setErrorText({ ...errorText, [name]: '' })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newDetails = { ...props.resume.personal, [name]: value }
        setPersonalDetails({ ...props.resume, personal: newDetails });
        props.resume.personal = newDetails;

        validateInput(name, value)
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Personal Details
            </Typography>
            <hr className={classes.line}></hr>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        value={props.resume.personal.firstName}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="given-name"
                        error={errorText.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        value={props.resume.personal.lastName}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="family-name"
                        error={errorText.lastName}
                    />
                </Grid>
                {(errorText.firstName) ?
                    <Alert className={classes.alertHalf} severity="error">{errorText.firstName}</Alert> : <div className={classes.alertHalf} ></div>
                }
                {(errorText.lastName) ?
                    <Alert className={classes.alertHalf} severity="error">{errorText.lastName}</Alert> : <div></div>
                }
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        value={props.resume.personal.email}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="email"
                        error={errorText.email}
                    />
                </Grid>
                {(errorText.email) ?
                    <Alert className={classes.alert} severity="error">{errorText.email}</Alert> : <div></div>
                }
                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone No."
                        value={props.resume.personal.phone}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="tel"
                        error={errorText.phone}
                    />
                </Grid>
                {(errorText.phone) ?
                    <Alert className={classes.alert} severity="error">{errorText.phone}</Alert> : <div></div>
                }

                <Grid item xs={12}>
                    <TextField
                        id="website"
                        name="website"
                        label="Professional Profile/Website"
                        value={props.resume.personal.website}
                        onChange={handleChange}
                        fullWidth
                        error={errorText.website}
                    />
                </Grid>{(errorText.website) ?
                    <Alert className={classes.alert} severity="error">{errorText.website}</Alert> : <div></div>
                }
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        resume: state.resume.data,
    }
}

const mapDispatchToProps = dispatch => ({
    setPersonalDetails: (props) => { dispatch(setPersonalDetails(props)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalForm);