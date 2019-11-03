const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: "721703521675195",
        clientSecret: keys.facebookSecret,
        callbackURL: `https://localhost:${process.env.PORT}/auth/facebook/callback`
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        User.findOrCreate(email, function(err, user) {
          if (err) {
            return done(err);
          }
          done(null, user);
        });
      }
    )
  );
};
