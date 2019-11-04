import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const UnauthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default UnauthRoute;
