import React, { Fragment } from "react";
import { connect } from "react-redux";
import { signOut } from "../actions/auth";
import { Link } from "react-router-dom";

const NavLinks = ({ signOut, auth }) => {
  const guestLinks = (
    <Fragment>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link" href="#">
            Sign Up
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link to="/adresar" className="nav-link mr-4" href="#">
            Dashboard <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/adresar/omiljeni" className="nav-link" href="#">
            Favorites
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" onClick={signOut} className="nav-link" href="#">
            Sign Out
          </Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <Fragment>{auth.isLoaded && (auth.uid ? authLinks : guestLinks)}</Fragment>
  );
};

const mapStateToProps = ({ firebase }) => {
  return {
    auth: firebase.auth,
  };
};

const mapDispatchToProps = () => (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavLinks);
