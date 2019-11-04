const express = require("express");
const router = express.Router();
const base64url = require("base64url");
const CryptoJS = require("crypto-js");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const clientid =
  "399852573966-vem0as4h14jmf4r3pc9rlbj1mjipe125.apps.googleusercontent.com";

const client = new OAuth2Client(clientid);

// load user model
const User = require("../../models/User");

router.post("/confirm", (req, res) => {
  //console.log(req.body);
  const { tokenId } = req.body;
  verify(tokenId, clientid)
    .then(verified => {
      if (!verified) {
        return res.status(401).json({ err: "fail" });
      }
      const { email, name } = verified;
      User.findOne({ email }).then(u => {
        const user = !u ? saveUser(name, email) : u;
        const payload = { id: user.id, name: user.name, email: user.email };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              message: "Authentication successful",
              token: `Bearer ${token}`
            });
          }
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
});

async function verify(token, CLIENT_ID) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return { name: payload.name, email: payload.email };
}

async function saveUser(name, email) {
  const user = await new User({ name, email }).save();
  return user;
}
module.exports = router;
