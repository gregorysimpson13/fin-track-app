import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    localStorage.removeItem("Authorization");
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
        localStorage.setItem("Authorization", result.data.token);
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="form-body">
        <h2>Login</h2>
        <form onSubmit={this.onSubmit} method="POST">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.onChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <Link className="new-user-link" to="/registration">
          New User
        </Link>
      </div>
    );
  }
}
