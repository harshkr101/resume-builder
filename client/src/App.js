import React from "react";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Form from "./components/Form"

const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Signup path="/signup" />
        <Form path="/form" />
      </Router>
    </div>
  );
};

export default App;
