const express = require("express");
const router = express.Router();
const base64url = require("base64url");
const CryptoJS = require("crypto-js");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const hackKey = require("../../client/src/facebook-hack").hackKey;
// load user model
const User = require("../../models/User");

router.post("/confirm", (req, res) => {
  const split = req.body.response.signedRequest.split(".");
  // console.log(req.body);
  const encoded_sig = split[0];
  const encoded_payload = split[1];
  const expected = CryptoJS.HmacSHA256(encoded_payload, keys.facebookSecret);
  const enc = base64url.fromBase64(CryptoJS.enc.Base64.stringify(expected));
  if (enc !== encoded_sig) {
    return res.status(401).json({ error: "failed to get data" });
  }
  // const validated_payload = JSON.parse(base64url.decode(encoded_payload));
  const name = CryptoJS.AES.decrypt(req.body.name, hackKey).toString(
    CryptoJS.enc.Utf8
  );
  const email = CryptoJS.AES.decrypt(req.body.email, hackKey).toString(
    CryptoJS.enc.Utf8
  );
  User.findOne({ email }).then(u => {
    const user = !u ? saveUser(name, email) : u;
    const payload = { id: user.id, name: user.name, email: user.email };
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        message: "Authentication successful",
        token: `Bearer ${token}`
      });
    });
  });
});

async function saveUser(name, email) {
  try {
    const user = await new User({ name, email }).save();
    return user;
  } catch (err) {
    console.log(err);
  }
}
module.exports = router;
