import React from "react";
import { Link } from "@reach/router";

const Home = (props) => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <button><Link to="/form">Let's Start...</Link></button>
    </div>
  );
};

export default Home;
