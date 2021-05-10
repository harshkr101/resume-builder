import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Personal from './forms/Personal';
import Education from './forms/Education';
import Experience from './forms/Experience';
import Project from './forms/Project';
import Skill from './forms/Skill';
import Achievement from './forms/Achievement';
import Template from './forms/Template';
import HiddenResume from './templates/HiddenResume'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux';
import { jsPDF } from "jspdf";
import { fetchData, postData, updateData } from '../redux/actionCreators';

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none',
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'absolute',
        left: '0px',
        top: '0px',
    },
    appBar: {
        position: 'relative',
        width: '100%',
    },
    layout: {
        width: 'auto',
        [theme.breakpoints.up('md')]: {
            width: 500,
            marginLeft: '',
            marginRight: 'auto',
        },
    },
    preview: {
        width: '50%',
        padding: '1%',
        marginRight: '',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    image: {
        width: '100%',
    },
    form: {
        display: 'flex',
    },
    paper: {
        /*
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            
        },
        */
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
    },
    stepper: {
        margin: theme.spacing(8, 1),
        width: '12%',
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    buttons: {
        position: 'absolute',
        right: '40px',
        top: '80px',
        marginLeft: 'auto',
        marginRight: '',
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: '480px',
            top: '80px',
        },
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    pdf: {
        //display: 'inherit',
        height: 'fit-content',
        position: 'absolute',
        top: '80px',
        left: '15px',
        [theme.breakpoints.down('sm')]: {
            right: '184px',
            left: 'unset',
            top: '96px',
            width: 'fit-content',
        },
    },
}));

const Builder = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [activeStep, setActiveStep] = React.useState(0);

    const token = props.token;
    /*
        React.useEffect(() => {
            props.fetchData(token, function () {
                console.log(props.state)
                setTimeout(function () {
                    console.log(props.state)
                    history.push("/builder")
                }, 3000);
            })
        }, [])
    */
    const steps = ['Personal', 'Educational', 'Experience', 'Projects', 'Skills', 'Achievements', 'Template'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Personal resume={props.resume} />;
            case 1:
                return <Education resume={props.resume} />;
            case 2:
                return <Experience resume={props.resume} />;
            case 3:
                return <Project resume={props.resume} />;
            case 4:
                return <Skill resume={props.resume} />;
            case 5:
                return <Achievement resume={props.resume} />;
            case 6:
                return <Template resume={props.resume} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        console.log(props.resume);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handlePdf = () => {
        var img = document.getElementById('preview');
        var width = img.clientWidth;
        var height = img.clientHeight;
        console.log(height, width)

        if (props.image) {
            const pdf = new jsPDF({
                unit: "px",
                format: [height, width]
            });
            pdf.addImage(props.image, 'PNG', 0.1, 0.1);
            pdf.save("resume.pdf");
        }
    };
    const clickSave = (event) => {
        if (event)
            event.preventDefault();

        if (props.resume._id) {
            props.updateData(token, props.resume);
        }
        else if (token) {
            props.postData(token, props.resume)
        }
        else {
            history.push("/signup");
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
            </AppBar>
            <div className={classes.form}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePdf}
                    className={classes.pdf}
                    disabled={(props.resume.template) ? "" : "true"}
                >
                    Download PDF
                </Button>
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
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={clickSave}
                                            className={classes.button}
                                        >
                                            Save
                                        </Button> :
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Next
                                        </Button>
                                    }
                                </div>
                            </React.Fragment>
                        </React.Fragment>
                    </Paper>
                </main>
                <div id='preview' className={classes.preview} >
                    {(props.image) ? <img alt='preview' className={classes.image} src={props.image} /> : <div></div>}
                </div>
            </div>
            {(props.resume.template) ? <HiddenResume
                className={classes.hidden}
                id={props.resume.template} />
                : <div></div>
            }
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        resume: state.resume.data,
        token: state.resume.token,
        image: state.resume.image
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
    postData: (token, resume) => { dispatch(postData(token, resume)) },
    updateData: (token, resume) => { dispatch(updateData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Builder);