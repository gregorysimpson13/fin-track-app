import React, { Component } from "react";
import FacebookLoginWithButton from "react-facebook-login";
import axios from "axios";
import { storeAuthToken } from "../../utils/auth";
import CryptoJS from "crypto-js";
import { hackKey } from "../../facebook-hack";

class FacebookButton extends Component {
  responseFacebook = response => {
    if (response.status === "unknown") return;
    const rawName = CryptoJS.AES.encrypt(response.name.toString(), hackKey);
    const rawEmail = CryptoJS.AES.encrypt(response.email.toString(), hackKey);
    const name = rawName.toString();
    const email = rawEmail.toString();
    const data = { name, email, response };

    axios
      .post("/api/auth/facebook/confirm", data)
      .then(result => {
        storeAuthToken(result.data.token);
        window.location.href = "/";
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <FacebookLoginWithButton
          appId="721703521675195"
          autoLoad={false}
          fields="name,email"
          callback={this.responseFacebook}
          icon="fa-facebook"
          redirectUri="/"
        />
      </div>
    );
  }
}

export default FacebookButton;
