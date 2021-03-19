import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        marginLeft: '2%',
        marginTop: '2%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    inputBox: {
        width: '80%',
        marginBottom: '2%',
        marginLeft: '10%'
    }
}));

export default function ControlledAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Personal Info</Typography>
                    <Typography className={classes.secondaryHeading}>Your Name, Email, Contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputBox} id="standard-basic" label="Full Name" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Email" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Phone No." />
                        <TextField className={classes.inputBox} id="standard-basic" label="Location" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Profile Link" />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Education</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Your Educational Background
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputBox} id="standard-basic" label="School Name" />
                        <TextField className={classes.inputBox} id="standard-basic" label="School Location" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Degree" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Major" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Start Date" />
                        <TextField className={classes.inputBox} id="standard-basic" label="End Date" />
                        <TextField className={classes.inputBox} id="standard-basic" label="GPA" />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Skills</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Your Skills/Expertise
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputBox} id="standard-basic" label="Skill Name" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Skill Details" />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Projects</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Your Projects
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputBox} id="standard-basic" label="Project Name" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Project Description" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Project Link" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Tools Used" />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel5bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Work-Ex</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Your Previous Work Experience
          </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputBox} id="standard-basic" label="Company Name" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Job Title" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Job Location" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Start Date" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Responsibilities" />
                    </form>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel6bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Certifications</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Your Awards and Accompolishments
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form noValidate autoComplete="off">
                        <TextField className={classes.inputBox} id="standard-basic" label="Award Name" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Award Date" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Award Date" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Awarder" />
                        <TextField className={classes.inputBox} id="standard-basic" label="Summary" />
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
