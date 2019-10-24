const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bycryptutil = require("../../util/bycryptutil");
const keys = require("../../config/keys");

const router = express.Router();

// Load Input Validation
//const validateRegisterInput = require("../../validation/registervalidation");

// load user model
const User = require("../../models/User");

// @route   POST api/user/register
// @desc    user registeration
// @access  PUBLIC
router.post("/register", (req, res) => {
  //   const { errors, isValid } = validateRegisterInput(req.body);
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }
  const errors = {};
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      res.status(400).json(errors);
    } else {
      const hash = bycryptutil.getHash(req.body.password1);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      newUser
        .save()
        .then(user => {
          res.json({ msg: "Success" });
        })
        .catch(err => res.status(404).json({ msg: "Failed" }));
    }
  });
});

// @route   POST api/user/login
// @desc    login the user
// @access  PUBLIC
router.post("/login", (req, res) => {
  // const { isValid, errors } = authvalidation(req.body);
  // if (!isValid) {
  //   return res.status(404).json(errors);
  // }
  const errors = {};
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    const isMatch = bycryptutil.compareHash(password, user.password);
    if (isMatch) {
      // user matched sign token
      const payload = { id: user.id, name: user.name };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        //res.json({ success: true, token: "Bearer " + token });
        res.json({
          success: true,
          message: "Authentication successful",
          token: `Bearer ${token}`
        });
      });
    } else {
      res.status(400).json({ password: "Invalid Password" });
    }
  });
});

// @route GET api/user/current
// @desc  Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ name: req.user.name, email: req.user.email, id: req.user.id });
  }
);

// @route   GET api/user/logout
// @desc    logout the user
// @access  PUBLIC
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router; // exporting the router
