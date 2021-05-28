import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        position: 'relative',
        left: '80%',
        top: '0'
    },
    alert: {
        padding: '0px',
        width: '100%',
    },
}));

const Description = ({ sectionName, index, name, section }) => {
    const classes = useStyles();

    console.log(sectionName, index, name)
    const [lines, setLines] = React.useState(section[index][name]);

    const [errorText, setErrorText] = React.useState('')

    const validateInput = (input) => {
        if (input.length < 3)
            setErrorText('Too Small Text')
        else setErrorText('')
    }


    const addLine = () => {
        const updatedLines = [...lines, '']
        setLines(updatedLines);
        section[index][name] = lines;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        validateInput(value)
        const updatedLines = lines
        updatedLines[id] = value
        setLines([...updatedLines]);
        section[index][name] = updatedLines;
    }

    return (
        <React.Fragment>
            {lines.map((text, idx) => (
                <div>
                    <TextField
                        id={idx}
                        name={idx}
                        label={`Description Line ${idx + 1}`}
                        value={text}
                        onChange={handleChange}
                        type='text'
                        error={errorText}
                        fullWidth
                    />
                    {(errorText) ?
                        <Alert className={classes.alert} severity="error">{errorText}</Alert> : <div></div>
                    }
                </div>
            ))}

            <Button onClick={addLine}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                +
            </Button>
        </React.Fragment>
    )
}

export default Description