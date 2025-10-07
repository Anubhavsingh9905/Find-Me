const passport = require("passport");
const { body, validationResult } = require('express-validator');
const User = require("./model/user.js");
const mongoose = require("mongoose");

// for proper email id syntax ...
module.exports =  validateregister = [
    body("emailId")
    .isEmail()
    .withMessage("please provide valid mail")
    .normalizeEmail(),

    (req, res, next) => {
        let err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({err:err.array()});
        }
        next();
    }
]

module.exports.isNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated && req.isAuthenticated()){
        console.log("You are already logged in");
        return res.status(400).json({message: "You are already logged in"});
    }
    next();
}

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated && !req.isAuthenticated()){
        console.log("You are not logged in");
        return res.status(400).json({message: "You are not logged in"});
    }
    next();
} 

module.exports.verifyEmail = async (req, res, next) => {
    let {emailId} = req.body;
    console.log(emailId);
    let user = await User.findOne({emailId: emailId});
    if(!user){
        console.log({message: "user with this Email not found"})
        return res.status(400).json({message: "user with this Email not found"})
    }
    next();
}