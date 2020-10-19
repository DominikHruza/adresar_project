import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./auth";
import alerts from "./alerts";

export default combineReducers({
  alerts,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
