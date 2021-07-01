import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
//import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
        [theme.breakpoints.up('lg')]: {
            width: 500,
            marginLeft: '',
            marginRight: 'auto',
        },
    },
    preview: {
        width: '50%',
        padding: '1%',
        marginRight: '',
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    buttons: {
        position: 'absolute',
        right: '20px',
        top: '96px',
        marginLeft: 'auto',
        marginRight: '',
        [theme.breakpoints.up('lg')]: {
            position: 'absolute',
            left: '480px',
            top: '80px',
        },
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            right: '40px',
            top: '80px',
            marginLeft: 'auto',
            marginRight: '',
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
        top: '84px',
        left: '15px',
        [theme.breakpoints.down('md')]: {
            right: '184px',
            left: 'unset',
            top: '104px',
            width: 'fit-content',
        },
        [theme.breakpoints.down('xs')]: {
            right: '20px',
            left: 'unset',
            top: '76px',
            width: 'fit-content',
        },
    },
    listLabel: {
        margin: '0px'
    },
    listItem: {
        padding: '0px'
    }
}));

const Builder = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [activeStep, setActiveStep] = React.useState(0);

    const token = props.token;

    const steps = ['Personal', 'Educational', 'Experience', 'Projects', 'Skills', 'Achievements', 'Template'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <Personal />;
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

    const handleClick = (idx) => {
        setActiveStep(idx);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const generatePdf = () => {
        var img = new Image();
        img.src = props.image;
        var preview = document.getElementById('preview');
        var width = preview.clientWidth;
        var height = preview.clientHeight;

        if (props.image) {

            const pdf = new jsPDF({
                orientation: (height > width) ? "portrait" : "landscape",
                unit: "pt",
                format: [height, width]//[height, width]//[img.height * (0.5625), img.width * (0.5625)]
            });
            pdf.addImage(img, 'PNG', 0, 0, width, height, 'SLOW');
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
                    onClick={generatePdf}
                    className={classes.pdf}
                    disabled={(props.image) ? "" : "true"}
                >
                    Download PDF
                </Button>
                <Stepper className={classes.stepper} orientation="vertical" activeStep={activeStep}>
                    {steps.map((label, idx) => (
                        <Step key={label}>
                            <StepLabel>
                                <ListItem key={label} button className={classes.listItem} onClick={() => { handleClick(idx) }}>
                                    <ListItemText primary={label} className={classes.listLabel} />
                                </ListItem>
                            </StepLabel>
                        </Step>
                    ))}
                    {/*<List>
                        {steps.map((label, idx) => (
                            <ListItem key={label} button onClick={() => { handleClick(idx) }}>
                                <ListItemText primary={label} />
                            </ListItem>
                        ))}
                    </List>*/}
                </Stepper>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <React.Fragment>
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    <Button onClick={handleBack} className={classes.button} disabled={(activeStep === 0) ? 'true' : ''}>
                                        Back
                                    </Button>
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
                <div className={classes.preview} >
                    {(props.image) ? <img id='preview' alt='preview' className={classes.image} src={props.image} /> : <div></div>}
                </div>
            </div>
            {(props.resume.template) ? <HiddenResume id={"pdf"} className={classes.hidden} /> : <div id={"pdf"} ></div>}
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