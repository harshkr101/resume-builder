import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"

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


const Template = (props) => {

    const classes = useStyles();
    const history = useHistory()

    const [title, setTitle] = useState(props.resume.title);

    const handleChange = (e) => {
        const { value } = e.target;

        setTitle(value);
        //console.log(resume.personal, personal, value);
        props.resume.title = title;
    }

    const handleClick = () => {

        history.push("/template1")

    }

    if (props.resume.template === '')
        props.resume.template = Math.random().toString(36).substring(2, 7);

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
                            value={title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleClick}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Template 1
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        </React.Fragment>
    )
}

export default Template;