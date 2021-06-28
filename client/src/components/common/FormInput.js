import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Description from './Description';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

var _ = require('lodash');

const useStyles = makeStyles((theme) => ({
    alert: {
        padding: '0px',
        width: '100%',
    },
}));

export default function FormInput(props) {
    const classes = useStyles();

    const [errorText, setErrorText] = React.useState({})

    const [minSize, setMinSize] = React.useState(50)

    const validateInput = (id, name, input) => {
        if (name === 'gpa')
            if (input.length < 1)
                setErrorText({ ...errorText, [id]: 'Too Small Input' })
            else if (input.length > 5)
                setErrorText({ ...errorText, [id]: 'Too Large Input' })
            else setErrorText({ ...errorText, [id]: '' })
        else if (name === 'projectName')
            if (input.length < 3)
                setErrorText({ ...errorText, [id]: 'Too Small Input' })
            else if (input.length > 100)
                setErrorText({ ...errorText, [id]: 'Too Large Input' })
            else setErrorText({ ...errorText, [id]: '' })
        else if (name === 'keywords') {
            var keywords = input.split(',');
            setMinSize(4)
            keywords.forEach(keyword => {
                if (keyword.length < 4)
                    setMinSize(keyword.length)
            })
            if (minSize < 4)
                setErrorText({ ...errorText, [id]: 'Too Small Keyword' })
            else setErrorText({ ...errorText, [id]: '' })
        }
        else {
            if (input.length < 3)
                setErrorText({ ...errorText, [id]: 'Too Small Input' })
            else setErrorText({ ...errorText, [id]: '' })
        }
    }

    const handleChange = (e) => {
        const updatedSection = [...props.section];
        validateInput(e.target.id, e.target.name, e.target.value)
        var keywords = e.target.value.split(',');
        updatedSection[props.id][e.target.name] = (e.target.name === 'keywords') ? keywords : e.target.value;
        props.update(updatedSection);
    };

    const inputAttributes = (item) => {
        const value = {
            type: 'text',
            shrink: false
        }
        if (item === 'date' || item === 'startDate' || item === 'endDate') {
            value.type = 'date'
            value.shrink = true
        }

        return value;
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                {
                    Object.entries(props.input).map((name, idx) => {
                        return (
                            <Grid key={idx} item xs={12}>
                                {(name[0] === 'description' || name[0] === 'projectDescription') ?
                                    <Description
                                        sectionName={props.name}
                                        section={props.section}
                                        index={props.id}
                                        name={name[0]}
                                    /> :
                                    <div>
                                        <TextField
                                            id={name + idx}
                                            name={name[0]}
                                            label={(name[0] === 'keywords') ? (_.startCase(name[0]) + ' (separated by a `,`)') : _.startCase(name[0])}
                                            value={props.section[props.id][name[0]]}
                                            onChange={handleChange}
                                            type={inputAttributes(name[0]).type}
                                            InputLabelProps={{
                                                shrink: (inputAttributes(name[0]).type === 'date' ? true :
                                                    props.section[props.id][name[0]] ? true : false),
                                                //color: props.section[props.id][name[0]].length < 3 ? 'primary' : 'secondary'
                                            }}
                                            error={errorText[name + idx]}
                                            fullWidth
                                        />
                                        {(errorText[name + idx]) ?
                                            <Alert className={classes.alert} severity="error">{errorText[name + idx]}</Alert> : <div></div>
                                        }
                                    </div>
                                }
                            </Grid>
                        );
                    })
                }
            </Grid>
        </React.Fragment>
    );

}
