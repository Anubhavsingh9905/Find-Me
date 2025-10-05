if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const localStrategy = require("passport-local");
const cors = require('cors');
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const mongoose = require("mongoose");

const localAuthenticateRouter = require("./router/authenticateLocal");
const googleAuthenticateRouter = require("./router/authenticateGoogle");
const photoUpload = require("./router/uploadPhoto");
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require("./model/user");


const app = express();

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
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

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
      secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("Error in MONGO SESSION STORE", error);
});

const sessionOption = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

app.use(session(sessionOption));

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