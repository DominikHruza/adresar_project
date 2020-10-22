import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (auth.isLoaded) {
                return !auth.uid ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                );
            }
        }}
    />
);
const mapStateToProps = ({ firebase }) => ({ auth: firebase.auth });

export default connect(mapStateToProps)(ProtectedRoute);
