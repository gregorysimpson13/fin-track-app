import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password1: "",
      password2: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const login = {
      name: this.state.name,
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2
    };
    axios
      .post("/api/user/register", login)
      .then(result => {
        window.location.href = "/login";
      })
      .catch(err => console.log(err));
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="form-body">
        <h2>Registration</h2>
        <form onSubmit={this.onSubmit} method="POST">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={this.onChange}
            />
          </div>
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
              name="password1"
              placeholder="Password"
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={this.onChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
