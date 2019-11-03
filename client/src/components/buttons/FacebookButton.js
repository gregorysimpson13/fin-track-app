import React from "react";
import FacebookLoginWithButton from "react-facebook-login";
import axios from "axios";

const responseFacebook = response => {
  console.log(response);
  //   axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  //     "https://www.facebook.com";
  //   const headers = {
  //     headers: "Access-Control-Allow-Origin: https://www.facebook.com"
  //   };
  //   axios.post("/api/auth/facebook/hey", { headers }).then(r => console.log(r));
  //   axios.post("/api/auth/facebook/callback").then(r => console.log(r));
};

const onClick = e => {
  //   e.preventDefault();
  //   axios.get("/api/auth/facebook/").then(r => console.log(r));
};

const FacebookButton = () => {
  return (
    <div>
      <FacebookLoginWithButton
        appId="721703521675195"
        autoLoad={false}
        fields="name,email"
        onClick={onClick}
        callback={responseFacebook}
        icon="fa-facebook"
      />
    </div>
  );
};

export default FacebookButton;
