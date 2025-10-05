if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const passport = require("passport");
const nodemailer = require("nodemailer");
const User = require("../model/user");
const validateregister = require("../middlewares");
const {isNotLoggedIn, isLoggedIn, verifyEmail} = require("../middlewares");
const user = require('../model/user');
const router = express.Router();


router.get("/check-auth", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({ isAuthenticated: true, user: req.user });
  }
  res.json({ isAuthenticated: false, user: null });
})

router.get("/", (req, res) => {
    res.send("please register or login your self");
});

// generate otp
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmail(to, subject, msg) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: to,
        subject: subject,
        text: msg
    });
}

// OTP sending ...
const otpStore = new Map();

router.post("/sendOtp", isNotLoggedIn, validateregister, async (req, res) => {
    try{
        const {emailId} = req.body;
        if (!emailId) {
            return res.status(400).json({ error: "Email ID is required" });
        }
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
        
        otpStore.set('otp', otp).set('expires', otpExpires);
        
        await sendEmail(emailId, 'Verify Your Email', `Your OTP is: ${otp}. It will expire in 15 minutes.`);
        console.log(otp);
        res.status(200).json({message: "otp sent successfully"});
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Server Error"});
    }
});

router.get("/register", (req, res) => {
    res.send("registe your self");
});


//REGISTER...
router.post("/register", isNotLoggedIn, validateregister, async (req, res, next) => {
    try {
        let {username, emailId, password, otp, phoneNumber} = req.body;

        
        // otpStore.set('email' , email).set('username', username).set('password', password);

        const userOtp = otpStore.get('otp');
        const expires = otpStore.get('expires');
        console.log(userOtp);

        let user = await User.findOne({ emailId });
        if (user) return res.status(400).json({message: "User already registered."});

        if(userOtp != otp){
            // console.log("glt hai bc");
            return res.status(400).json({message: "Incorrect otp"});
        } 
        if(expires < Date.now()){
            return res.status(400).json({message: "otp Expires"});
        }

        let newUser = new User({username, emailId, phoneNumber});

        let registeredUser = await User.register(newUser, password);

        registeredUser.isVerified = true;
        registeredUser.save();

        req.logIn(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            console.log("user registered");
            res.status(200).json({message: "User Registered and Verified succesfully"});
        })
        
    }
    catch (err) {
    
        console.log(err);
        res.status(500).json({message: err.message});
    }
});

router.get("/verifyEmail" , (req,res) => {
    res.send("verify Your email");
})

// router.post("/verifyEmail", async(req, res) => {
//     try{

//         const email = otpStore.get('email');
//         const username = otpStore.get('username');
//         const password = otpStore.get('password');
        
//         console.log(email);
//         console.log(username);

//     }catch(err){
//         res.status(400).send(err);
//     }
// })

// LOGIN

router.get("/login", isNotLoggedIn, (req,res) => {
    res.status(500).json({message: "Wrong username or password"});
})

router.post("/login", 
    isNotLoggedIn,
    verifyEmail,
    passport.authenticate('local'), async (req, res) => {
 
    let {username} = req.body;
    console.log("user", username);
    console.log("Login request body:", req.body);
    console.log("Session before login:", req.session);
    console.log("Is authenticated:", req.isAuthenticated());

    // let user = await User.findOne({username: username});
    // let userId = user._id.toString()

    // res.status(200).json({message: userId});
    console.log("hello");
    res.status(200).json({message: "logged in successfully"});
});

// LOGOUT

router.get('/logout', isLoggedIn, (req, res) => {

    req.logOut((err) => {
        if(err){
            console.log(err);
            next(err);
        }

        res.status(200).json({message: "Loged Out"});
    });
});

module.exports = router;