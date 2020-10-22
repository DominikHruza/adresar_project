import { LOGIN_SUCCESS, LOGIN_FAIL, SIGN_OUT } from "./action-types";

export const signIn = (creds) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        //Try user login
        firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password)
            .then(() => {
                dispatch({ type: LOGIN_SUCCESS });
            })
            .catch((err) => {
                //If user with given creds not found in db, register new account
                if (err.code === "auth/user-not-found") {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            creds.email,
                            creds.password
                        )
                        .then((data) => {
                            //Create user in database and save uid
                            const dbRef = firebase.database().ref("users");
                            dbRef.push({
                                email: creds.email,
                                userId: data.user.uid,
                            });
                            dispatch({ type: LOGIN_SUCCESS });
                        })
                        //On register fail
                        .catch(function (err) {
                            dispatch({ type: LOGIN_FAIL });
                        });
                    //On login fali
                } else {
                    dispatch({ type: LOGIN_FAIL });
                }
            });
    };
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch({ type: SIGN_OUT });
        })
        .catch();
};
