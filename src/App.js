import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//Redux
import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
// Firestore
import firebase from "./firebase-config";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

//Components and pages
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn/SignIn";

const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={SignIn} />
        </Fragment>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;
