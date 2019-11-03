const express = require("express");
const passport = require("passport");
const cors = require("cors");
const router = express.Router();

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get("/", passport.authenticate("facebook", { scope: "name,email" }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.post(
  "/callback",
  passport.authenticate(
    "facebook",
    {
      successRedirect: "/",
      failureRedirect: "/login"
    },
    (req, res) => {
      console.log(res._headers);
      console.log(req._headers);
      console.log("hello world");
      res.send("hello");
    }
  )
);

router.get("/hello", (req, res) => {
  res.send("hello world");
});

router.post("/hey", (req, res) => {
  console.log(res._headers);
});

module.exports = router;
