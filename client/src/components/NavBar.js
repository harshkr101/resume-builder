import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AssignmentIndTwoToneIcon from '@material-ui/icons/AssignmentIndTwoTone';
import { connect } from 'react-redux';
import { logout, fetchData } from '../redux/actionCreators';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    logo: {
        width: '3em',
        height: '3em'
    },
    title: {
        flexGrow: 1,
    },
    link: {
        '&:hover': {
            textDecoration: 'none',
            color: 'inherit'
        }
    }
}));

const ButtonAppBar = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {
        //props.fetchData(props.token, function () {
        history.push("/dashboard")
        //})
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img className={classes.logo} src="./logo.png" alt="logo" />
                    <Typography variant="h5" className={classes.title}>
                        <Link extact to="/" className={classes.link}>Resume Builder</Link>
                    </Typography>
                    {(!props.token) ?
                        (<React.Fragment>
                            <Button color="secondary-dark">
                                <Link to="/signup" className={classes.link}>Signup</Link>
                            </Button>
                            <Button color="secondary-dark">
                                <Link to="/login" className={classes.link}>SignIn</Link>
                            </Button>
                        </React.Fragment>) :
                        (<React.Fragment>
                            <Button color="secondary-dark" onClick={handleClick} >
                                <AssignmentIndTwoToneIcon />
                            </Button>
                            <Button onClick={props.logout} color="secondary-dark">
                                <Link to="/login" className={classes.link}>Logout</Link>
                            </Button>
                        </React.Fragment>)
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        token: state.resume.token
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => { dispatch(logout()) },
    fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);