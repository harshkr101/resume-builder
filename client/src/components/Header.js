import React from "react";
import { Link } from "@reach/router";

const Header = () => {
  return (
    <div>
      <header className="header">
        <img src="./logo.png" alt="logo" />
        <Link to="/">Resume Builder</Link>
        <nav>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;

/*
    
*/
