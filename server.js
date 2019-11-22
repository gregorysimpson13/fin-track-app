const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/keys").mongoURI;

const user = require("./routes/api/user");
const purchase = require("./routes/api/purchase");
const facebook = require("./routes/api/facebook");
const google = require("./routes/api/google");

const app = express(); // init the application
//app.use(cors({ origin: "https://www.facebook.com", credentials: false }));
app.use(cookieParser());
app.use(cors());

// redirect url
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect("https://" + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
});

const mongodb = process.env.mongoURI || db;

// Connect to mongoose
mongoose
  .connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected")) // promise
  .catch(err => console.log(err));

// Body parser middleware - access whats submitted
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
require("./config/facebook-passport")(passport);

app.use("/api/user", user);
app.use("/api/purchase", purchase);
app.use("/api/auth/facebook", facebook);
app.use("/api/auth/google", google);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`test hack key is the following ${process.env.hackKey}`);
});
