import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root";
import {
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "./firebase-config";
import firebase from "firebase/app";
const initState = {};
const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const store = createStore(
  rootReducer,
  initState,
  compose(
    composeWithDevTools(applyMiddleware(...middleware)),
    reduxFirestore(firebaseConfig)
  )
);

export const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

export default store;
