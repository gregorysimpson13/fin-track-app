const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./config/keys").mongoURI;

const user = require("./routes/api/user");
const purchase = require("./routes/api/purchase");

const app = express(); // init the application

// Connect to mongoose
mongoose
  .connect(db, {
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

app.use("/api/user", user);
app.use("/api/purchase", purchase);

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
});
