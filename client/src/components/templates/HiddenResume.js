import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Template1 from './template1/Template1'

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none'
    },
}));

const HiddenResume = (props) => {
    const classes = useStyles();

    return (
        <Template1 className={classes.hidden} />
    )

}

export default HiddenResume