import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./auth";
import alerts from "./alerts";
import contacts from "./contacts";

export default combineReducers({
  alerts,
  contacts,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
