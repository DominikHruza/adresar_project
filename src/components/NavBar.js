import React from "react";
import { connect } from "react-redux";
import NavLinks from "./NavLinks";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/adresar">
          Adresar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavLinks />
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(NavBar);
