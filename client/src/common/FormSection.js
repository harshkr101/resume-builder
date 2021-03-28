import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormInput from './FormInput';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
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

export default function FormSection(props) {

    const blankSection = props.input;

    const [section, setSection] = useState([
        { ...blankSection },
    ]);

    const addSection = () => {
        setSection([...section, { ...blankSection }]);
    };

    const classes = useStyles();

    return (
        <React.Fragment>
            {
                section.map((val, idx) => {

                    return (
                        <div key={`section-${idx}`}>
                            <hr className={classes.line}></hr>
                            <FormInput section={[...section]} id={idx} setSection={setSection} input={props.input} />
                        </div>
                    );
                })
            }
            <Button onClick={addSection}
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Add {props.name}
            </Button>
        </React.Fragment>
    );
}