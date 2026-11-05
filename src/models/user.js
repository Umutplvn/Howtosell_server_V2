"use strict";

/* -------------------------------------------------------
    EXPRESSJS - How To Sell Project
------------------------------------------------------- */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, trim:true },
    email: { type: String, trim:true },
    phone: { type: String, trim:true },
    companyName: { type: String, trim:true },
    companyWebsite: { type: String, trim:true },
    role: { type: String, trim:true },
    teamSize: { type: String, trim:true },
    challenge: { type: String, trim:true },
    investment: { type: String, trim:true },
    when:{type:String, trim:true},
    joinedWaitlist: { type: Boolean, default: false },
    waitlistJoinedAt: { type: Date, default: null },
    connected:{ type: Boolean, default:false },
    connectedBy:{ type: String, trim:true, default:"-" }

}, {collection:'user', timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;
