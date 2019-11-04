import React, { Component } from "react";
import { logoutUser } from "../../utils/auth";

export default class LogoutRedirect extends Component {
  componentDidMount = () => {
    logoutUser();
    window.location.href = "/login";
  };
  render() {
    return <div></div>;
  }
}
