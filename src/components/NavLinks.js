import React, { Fragment } from "react";
import { connect } from "react-redux";
import { signOut } from "../actions/auth";
import { Link } from "react-router-dom";

const NavLinks = ({ signOut, auth }) => {
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="" className="nav-link" href="#">
          Sign In
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className="nav-item active">
        <Link to="/adresar" className="nav-link" href="#">
          Dashboard <span className="sr-only">(current)</span>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/adresar/omiljeni" className="nav-link" href="#">
          Favorites
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/" onClick={signOut} className="nav-link" href="#">
          Sign Out
        </Link>
      </li>
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
