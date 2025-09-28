const { mongoose } = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { text } = require("express");

const userSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator); // for uniqueness of any collection
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Userdb", userSchema);