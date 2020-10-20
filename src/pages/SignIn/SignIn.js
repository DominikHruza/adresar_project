import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signIn } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Alert from "../../components/Alert";
import "./sign-in-style.css";
import { validatePassword } from "../../helpers/password-validation";

const SignIn = ({ signIn, setAlert, authError }) => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authError) setAlert("Wrong credentials!", "danger");
  }, [authError]);

  const handleInputChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validatePassword(inputState.password);
    if (!isValid) {
      setAlert(
        `Password must be minimum of 6 characters long.
         Must contain at least one number. 
         Must contain at least one special character ( !,#,$,+,-)`,
        "danger"
      );
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
