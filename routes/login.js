const {User}= require('../models/usermodel');
const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require('config')



router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(!user)return res.status(400).send("email and pssword invalid");

    const validpassword = await bcrypt.compare(req.body.password,user.password);

    if(!validpassword) return res.status(400).send("email and password invalid");
   const token = user.generateAuthoken();
   res.send(token)
});

function validate(req){
    let schema ={
      
        email:joi.string().min(5).max(255).required().email(),
        password:joi.string().min(5).max(255).required(),
    }
    return joi.validate(req, schema);
}
module.exports = router;