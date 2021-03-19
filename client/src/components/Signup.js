import React, { useState } from "react";

import { Redirect } from "@reach/router";

/*
    userName:  req.body.userName,
    firstName: req.body.firstName,
    lastName:  req.body.lastName
*/

// const axios = require("axios");

const Signup = (props) => {
  const [userName, setUserName] = useState("");
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  /*
  const submit = () => {
    axios
      .post("http://localhost:3000/api/signup", {
        userName: userName,
        fName: fName,
        lName: lName,
        email: email,
        password: password
      })
      .then(function (response) {
        console.log(response);
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
*/
  /*
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/'
  });
*/

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        body: JSON.stringify({
          // userName: userName,
          firstName: fName,
          lastName: lName,
          email: email,
          password: password,
        }),
      });

      // setRedirect(true);
      const temp = response.json()
      console.log(temp);
      return temp;
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <form className="container" onSubmit={submit}>
      <label htmlFor="userName">
        User Name
        <input
          id="userName"
          value={userName}
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label htmlFor="fName">
        First Name
        <input
          id="fName"
          value={fName}
          placeholder="First Name"
          onChange={(e) => setfName(e.target.value)}
        />
      </label>
      <label htmlFor="lName">
        Last Name
        <input
          id="lName"
          value={lName}
          placeholder="Last Name"
          onChange={(e) => setlName(e.target.value)}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Signup;
