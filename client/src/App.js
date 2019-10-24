import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Registration from "./components/forms/Registration";
import Login from "./components/forms/Login";
import AddPurchase from "./components/forms/AddPurchase";
import MainPage from "./components/layout/MainPage";

import PrivateRoute from "./components/common/PrivateRoute";

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
