import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Personal from './forms/Personal';
import Education from './forms/Education';
import Experience from './forms/Experience';
import Project from './forms/Project';
import Skill from './forms/Skill';
import Achievement from './forms/Achievement';
import Review from './Review';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        [theme.breakpoints.up(500 + theme.spacing(2) * 2)]: {
            width: 500,
            marginLeft: '',
            marginRight: 'auto',
        },
    },
    form: {
        display: 'flex',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        margin: theme.spacing(6, 1),
        width: '12%',
        display: 'inline-block'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Personal', 'Educational', 'Experience', 'Projects', 'Skills', 'Achievements', 'Preview'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <Personal />;
        case 1:
            return <Education />;
        case 2:
            return <Experience />;
        case 3:
            return <Project />;
        case 4:
            return <Skill />;
        case 5:
            return <Achievement />;
        case 6:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Dashboard() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
            </AppBar>
            <div className={classes.form}>
                <Stepper className={classes.stepper} orientation="vertical" activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h2">
                                        Downloading Your Resume...
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        {getStepContent(activeStep)}
                                        <div className={classes.buttons}>
                                            {activeStep !== 0 && (
                                                <Button onClick={handleBack} className={classes.button}>
                                                    Back
                                                </Button>
                                            )}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Download' : 'Next'}
                                            </Button>
                                        </div>
                                    </React.Fragment>
                                )}
                        </React.Fragment>
                    </Paper>
                </main>
            </div>
        </React.Fragment>
    );
}