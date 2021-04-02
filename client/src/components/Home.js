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
    image: {
        backgroundImage: 'url(https://source.unsplash.com/800x450/?resume)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '66vh',
        margin: '0'
    },
}));

const Home = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img xs={false} sm={4} md={7} className={classes.image} alt="resume" />
            <Button variant="contained" color="primary">
                <Link to="/dashboard">Let's Start</Link>
            </Button>
        </div>
    )

}

export default Home