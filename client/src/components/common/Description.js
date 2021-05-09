import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        position: 'relative',
        left: '80%',
        top: '0'
    },
}));

const Description = ({ sectionName, index, name, section }) => {
    const classes = useStyles();

    console.log(sectionName, index, name)
    const [lines, setLines] = React.useState(section[index][name]);

    const addLine = () => {
        const updatedLines = [...lines, '']
        setLines(updatedLines);
        section[index][name] = lines;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const updatedLines = lines
        updatedLines[id] = value
        setLines([...updatedLines]);
        section[index][name] = updatedLines;
    }

    return (
        <React.Fragment>
            {lines.map((text, idx) => (
                <TextField
                    id={idx}
                    name={idx}
                    label={`Description Line ${idx + 1}`}
                    value={text}
                    onChange={handleChange}
                    type='text'
                    fullWidth
                />
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