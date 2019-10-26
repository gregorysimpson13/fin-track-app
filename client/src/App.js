import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Registration from "./components/forms/Registration";
import Login from "./components/forms/Login";
import AddPurchase from "./components/forms/AddPurchase";
import MainPage from "./components/layout/MainPage";
import PrivateRoute from "./components/common/PrivateRoute";
import { setAuthToken, logoutUser } from "./utils/auth";

// check for auth token
if (localStorage.authToken) {
  // set auth token header auth
  setAuthToken(localStorage.authToken);
  // decode token and get user info and expiration
  const decode = jwt_decode(localStorage.authToken);
  // check for expiration
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    // logout user and send user to login screen
    logoutUser();
    window.location.href = "/";
  }
}

function App() {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Route exact path="/register" component={Registration} />
        <main>
          <Switch>
            <PrivateRoute exact path="/" component={MainPage} />
            <PrivateRoute exact path="/add" component={AddPurchase} />
          </Switch>
          <Route exact path="/login" component={Login} />
        </main>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default App;
