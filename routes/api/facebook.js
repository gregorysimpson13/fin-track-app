const express = require("express");
const router = express.Router();
const base64url = require("base64url");
const CryptoJS = require("crypto-js");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

// load user model
const User = require("../../models/User");

router.post("/confirm", (req, res) => {
  const split = req.body.signedRequest.split(".");
  const encoded_sig = split[0];
  const payload = split[1];
  const expected = CryptoJS.HmacSHA256(payload, keys.facebookSecret);
  const enc = base64url.fromBase64(CryptoJS.enc.Base64.stringify(expected));
  if (enc !== encoded_sig) {
    return res.status(401).json({ error: "failed to get data" });
  }
  const decoded_payload = req.body;
  const { name, email } = decoded_payload;
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
  const user = await new User({ name, email }).save();
  return user;
}
module.exports = router;
