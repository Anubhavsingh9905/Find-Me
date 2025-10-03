if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const localStrategy = require("passport-local");
const cors = require('cors');
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");

const localAuthenticateRouter = require("./router/authenticateLocal");
const googleAuthenticateRouter = require("./router/authenticateGoogle");
const photoUpload = require("./router/uploadPhoto");
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require("./model/user");


const app = express();

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

main().then(() => {
  console.log("Data Base Connected");
}).catch((err) => {
  console.log(err);
})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true              
}));

app.use(require('cookie-parser')());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,       // localhost pe false rakho
    httpOnly: true       // XSS se protection
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser((user, done) => {
  done(null, user.id);  
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);  
  } catch (err) {
    done(err, null);
  }
});

app.use("/email", localAuthenticateRouter);
app.use("/", googleAuthenticateRouter);
app.use("/photo", photoUpload);


module.exports = app;