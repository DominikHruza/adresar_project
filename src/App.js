import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import "./App.css";
//Redux
import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
// Firebase
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
//Components and pages
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn/SignIn";
import EditContact from "./pages/Edit/EditContact";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import AddContact from "./pages/AddContact/AddContact";
import ContactDetails from "./pages/ContactDetails/ContactDetails";

const App = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={SignIn} />
          <ProtectedRoute exact path="/adresar" component={Home} />
          <ProtectedRoute
            exact
            path="/adresar/omiljeni"
            component={Favorites}
          />
          <ProtectedRoute exact path="/kontakt" component={AddContact} />
          <ProtectedRoute
            exact
            path="/kontakt/detalji/:id"
            component={ContactDetails}
          />
          <ProtectedRoute
            exact
            path="/kontakt/detalji/:id/azuriraj"
            component={EditContact}
          />
        </Fragment>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
);

export default App;
