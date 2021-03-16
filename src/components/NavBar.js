import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <BrowserRouter>
                        <Typography variant="h5" className={classes.title}>
                            <Link to="/" className={classes.link}>Resume Builder</Link>
                        </Typography>
                        <Button color="secondary-dark">
                            <Link to="/signup" className={classes.link}>Signup</Link>
                        </Button>
                        <Button color="secondary-dark">
                            <Link to="/login" className={classes.link}>Login</Link>
                        </Button>
                    </BrowserRouter>
                </Toolbar>
            </AppBar>
        </div>
    );
}
