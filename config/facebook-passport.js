const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: "721703521675195",
        clientSecret: process.env.facebookSecret || keys.facebookSecret,
        profileFields: ["email", "name"],
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileURL: "https://graph.facebook.com/v5.0/me"
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log(accessToken);
        // console.log(refreshToken);
        // console.log(profile);
        // User.findOrCreate(email, function(err, user) {
        //   if (err) {
        //     return done(err);
        //   }
        //   done(null, user);
        // });
      }
    )
  );
};
