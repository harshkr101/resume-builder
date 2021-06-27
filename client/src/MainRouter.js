import React from "react";
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Builder from './components/Builder';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Template1 from './components/templates/template1/Template1';
import Template2 from './components/templates/template2/Template2';
import { connect } from 'react-redux';
import { logInSuccess } from './redux/actionCreators';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
  },
  mainContent: {
    flexGrow: 1
  }
}));

const MainRouter = (props) => {

  const classes = useStyles();

  const storedJwt = localStorage.getItem('token');

  React.useEffect(() => {
    if (storedJwt)
      props.logInSuccess(storedJwt)
  }, []) //eslint-disable-line


  return (
    <div className={classes.wrapper}>
      <NavBar />
      <div className={classes.mainContent}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/builder" component={Builder} />
          <Route path="/password/forgot" component={ForgotPassword} />
          <Route path="/password/reset" component={ResetPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/template1" component={Template1} />
          <Route path="/template2" component={Template2} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    resume: state.resume,
    token: state.resume.token
  }
}

const mapDispatchToProps = dispatch => ({
  logInSuccess: (props, callback) => { dispatch(logInSuccess(props)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainRouter);
