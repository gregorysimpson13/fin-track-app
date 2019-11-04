import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { storeAuthToken, logoutUser } from "../../utils/auth";
import FacebookButton from "../buttons/FacebookButton";
import GoogleLoginButton from "../buttons/GoogleLoginButton";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount = () => {
    // if logged in log out
    logoutUser();
  };

  onSubmit = event => {
    event.preventDefault();
    const login = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/api/user/login", login)
      .then(result => {
        storeAuthToken(result.data.token);
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container login-buttons">
        <FacebookButton />
        <GoogleLoginButton />
      </div>
    );
  }
}
