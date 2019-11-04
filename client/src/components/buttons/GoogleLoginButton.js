import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { storeAuthToken } from "../../utils/auth";

// clientId
// "399852573966-vem0as4h14jmf4r3pc9rlbj1mjipe125.apps.googleusercontent.com"

const responseGoogle = response => {
  console.log(response);
  console.log("success");
  axios
    .post("/api/auth/google/confirm", response)
    .then(result => {
      storeAuthToken(result.data.token);
      window.location.href = "/";
    })
    .catch(err => console.log(err));
};

// const requestFailed = () => {
//   console.log("failed");
// };

class GoogleLoginButton extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <GoogleLogin
        clientId="399852573966-vem0as4h14jmf4r3pc9rlbj1mjipe125.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        //onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        scope="email"
      />
    );
  }
}

export default GoogleLoginButton;
