import React, { Fragment } from "react";
import { connect } from "react-redux";
import { signOut } from "../actions/auth";
import { NavLink } from "react-router-dom";

const NavLinks = ({ signOut, auth }) => {
    const guestLinks = (
        <Fragment>
            <ul className="navbar-nav ml-auto"></ul>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                    <NavLink
                        exact
                        to="/adresar"
                        className="nav-link"
                        activeClassName="active"
                    >
                        Dashboard <span className="sr-only"></span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        exact
                        to="/adresar/omiljeni"
                        className="nav-link"
                        activeClassName="active"
                    >
                        Favorites
                    </NavLink>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink
                        exact
                        to="/"
                        onClick={signOut}
                        className="nav-link"
                        activeClassName="active-nav-link"
                    >
                        Sign Out
                    </NavLink>
                </li>
            </ul>
        </Fragment>
    );

    return (
        <Fragment>
            {auth.isLoaded && (auth.uid ? authLinks : guestLinks)}
        </Fragment>
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
