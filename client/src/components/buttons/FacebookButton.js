import React from "react";
import FacebookLoginWithButton from "react-facebook-login";
import axios from "axios";
import { storeAuthToken } from "../../utils/auth";
import CryptoJS from "crypto-js";
import { hackKey } from "../../facebook-hack";

const responseFacebook = response => {
  const rawName = CryptoJS.AES.encrypt(response.name, hackKey);
  const rawEmail = CryptoJS.AES.encrypt(response.email, hackKey);
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

const FacebookButton = () => {
  return (
    <div>
      <FacebookLoginWithButton
        appId="721703521675195"
        autoLoad={false}
        fields="name,email"
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default FacebookButton;
