import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        textAlign: 'center'
    },
}));

const Home = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary">
                <Link to="/dashboard">Let's Start</Link>
            </Button>
        </div>
    )

}

export default Home