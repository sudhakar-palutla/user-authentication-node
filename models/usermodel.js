const express= require('express');
const joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config')

 var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:5,
        maxlength : 255
    },
    email:{
        type: String,
        required:true,
        minlength:5,
        maxlength : 255,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:5,
        maxlength : 255
    },
    isAdmin :Boolean
})

userSchema.methods.generateAuthoken = function(){
    const token = jwt.sign({_id:this._id, isAdmin :this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}
var User = mongoose.model("User",userSchema );

function validateUser(User){
    let schema ={
        name: joi.string().min(5).max(255).required(),
        email:joi.string().min(5).max(255).required().email(),
        password:joi.string().min(5).max(255).required(),
        isAdmin :joi.boolean()
    }
    return joi.validate(User, schema);
}
exports.User= User;
exports.validate = validateUser