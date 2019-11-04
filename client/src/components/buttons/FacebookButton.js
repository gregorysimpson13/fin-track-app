import React from "react";
import FacebookLoginWithButton from "react-facebook-login";
import axios from "axios";
import { storeAuthToken } from "../../utils/auth";

const responseFacebook = response => {
  console.log(response);
  axios
    .post("/api/auth/facebook/confirm", response)
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
