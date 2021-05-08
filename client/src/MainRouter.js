import React from "react";
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const MainRouter = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/password/forgot"  component={ForgotPassword} />
        <Route path="/password/reset"  component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default MainRouter;
