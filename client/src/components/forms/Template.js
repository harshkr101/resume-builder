import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { setTitle, updateResumeData } from '../../redux/actionCreators';
import templates from '../templates/templates';
import Alert from '@material-ui/lab/Alert';

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
    button: {
        flexBasis: "50%"
    },
    alert: {
        padding: '0px',
        width: '100%',
    },
}));


const Template = (props) => {

    const classes = useStyles();
    const history = useHistory()

    const [errorText, setErrorText] = React.useState('')

    const validateInput = (input) => {
        if (input.length < 3)
            setErrorText('Too Small Input')
        else setErrorText('')
    }

    const handleChange = (e) => {
        const { value } = e.target;
        validateInput(value)
        props.setTitle(value);

        const newData = { ...props.resume.data, title: value }
        props.updateResumeData(newData);
        props.resume.data = newData;
    }

    const handleClick = (template) => {
        props.resume.template = template
        props.resume.data.template = template
        const update = 'update'
        history.push(`/${template}`, update)
    }

    return (
        <React.Fragment>
            <h5>Choose Template</h5>
            <React.Fragment>
                <hr className={classes.line}></hr>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            value={props.resume.data.title}
                            onChange={handleChange}
                            error={errorText}
                            fullWidth
                        />
                    </Grid>
                    {(errorText) ?
                        <Alert className={classes.alert} severity="error">{errorText}</Alert> : <div></div>
                    }
                    {templates.map((template, index) => (
                        <Grid key={index} item xs={12} className={classes.button} >
                            <Button onClick={() => { handleClick(template) }}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                {template}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        </React.Fragment >
    )
}

const mapStateToProps = state => {
    return {
        resume: state.resume,
    }
}

const mapDispatchToProps = dispatch => ({
    setTitle: (props) => { dispatch(setTitle(props)) },
    updateResumeData: (props) => { dispatch(updateResumeData(props)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);