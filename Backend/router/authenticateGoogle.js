if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require('express');
const passport = require('passport');
const {isNotLoggedIn} = require("../middlewares");
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const User = require("../model/user");
const router = express.Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Google_CLIENT_ID,
      clientSecret: process.env.Google_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/v1/google/loggedin"
    },

    async function(accessToken, refreshToken, profile, done) {
      const user = await User.findOne({username: profile.id});

      if(!user){
        const newUser = await User.create({
          username: profile.id,
          emailId: profile.emails[0].value,
          isVerified: profile.emails[0].verified,
        })
        console.log(newUser);
        return done(null, newUser);
      }else{
        return done(null, user);
      }
    }
  )
)


passport.serializeUser((user, done) => {  
  done(null, user);  
});  
passport.deserializeUser((user, done) => {  
  done(null, user);  
});


router.get("/", (req, res) => {
    res.status(400).json({message: "login again"});
})


router.get(  
  '/v1/google',  
  isNotLoggedIn,
  passport.authenticate('google', { scope: ['profile', 'email'] })  
);  


router.get(  
  '/v1/google/loggedin', 
  isNotLoggedIn,
  passport.authenticate('google', { failureRedirect: '/' }),  
  (req, res) => {  
    res.redirect(`http://localhost:5173/dashboard`)
  }  
);

module.exports = router;