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
import resume from '../resume';

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
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        margin: theme.spacing(2, 1),
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
            return <Personal resume={resume} />;
        case 1:
            return <Education resume={resume} />;
        case 2:
            return <Experience resume={resume} />;
        case 3:
            return <Project resume={resume} />;
        case 4:
            return <Skill resume={resume} />;
        case 5:
            return <Achievement resume={resume} />;
        case 6:
            return <Review resume={resume} />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Dashboard(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const token = props.location.state;

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));
    console.log(user)
    resume.personal.firstName = user.firstName || '';
    resume.personal.lastName = user.lastName || '';
    resume.personal.email = user.email || '';

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        console.log(resume);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const getData = async () => {

        try {
            let response = await fetch(`http://localhost:3000/api/dashboard/resume/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(user)
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }

    const create = async (resume) => {
        const bodyData = {
            data: resume,
            user: user
        }

        try {
            let response = await fetch('http://localhost:3000/api/dashboard/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(bodyData)
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }

    const clickGenerate = (event) => {
        event.preventDefault();

        create(resume).then((data) => {
            console.log(data)
        })
    }

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
                                        Review Your Resume...
                                    </Typography>
                                    <Button onClick={clickGenerate} className={classes.button}>
                                        Generate Resume
                                    </Button>
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
                                                {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
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