import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Alert from "../../components/Alert";
import "./sign-in-style.css";
import { validatePassword } from "../../helpers/password-validation";
import { withRouter } from "react-router-dom";

const SignIn = ({ signIn, setAlert, authError, history, auth }) => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authError) setAlert("Wrong credentials!", "danger");
  }, [authError]);

  useEffect(() => {
    if (auth.uid) {
      history.push("/adresar");
    }
  }, [auth.uid]);

  const handleInputChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validatePassword(inputState.password);
    if (!isValid || inputState.email === "") {
      setAlert("Wrong credentials!", "danger");
      return;
    }

    signIn({ ...inputState });
  };

  return (
    <div className="container-form">
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <Alert />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="example@email.com"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    setAlert: (message, type) => dispatch(setAlert(message, type)),
  };
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authFailed,
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
