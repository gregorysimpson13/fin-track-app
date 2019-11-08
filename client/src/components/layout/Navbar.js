import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const Navbar = () => {
  return (
    <header>
      <nav className="header-content">
        <div className="title-div">
          <Link className="navbar-title" to="/">
            Fintrack
          </Link>
        </div>
        {isAuthenticated() ? (
          <div className="links-div">
            <Link className="page-link" to="/">
              Details
            </Link>
            <Link className="page-link" to="/summary">
              Summary
            </Link>
            <Link className="page-link" to="/logout">
              Log Out
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
