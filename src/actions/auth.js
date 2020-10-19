import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./action-types";

export const signIn = (creds) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((err) => {
        dispatch({ type: LOGIN_FAIL });
      });
  };
};
