import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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
    }
}));

export default function PersonalForm({ resume }) {

    const classes = useStyles();

    const [personal, setPersonal] = useState(resume.personal);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPersonal(prevState => ({
            ...prevState,
            [name]: value
        }));
        //console.log(resume.personal, personal, value);
        resume.personal = personal;

        /*
         const updatedSection = resume.personal;
         updatedSection[name] = value;
         setPersonal(updatedSection)
         resume.personal = personal;
         console.log(resume.personal, personal, value);
         */
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
                        value={personal.firstName}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        value={personal.lastName}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email Address"
                        value={personal.email}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone No."
                        value={personal.phone}
                        onChange={handleChange}
                        fullWidth
                        autoComplete="tel"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="website"
                        name="website"
                        label="Professional Profile/Website"
                        value={personal.website}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}