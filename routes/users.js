const {User, validate}= require('../models/usermodel');
const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');



router.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user)return res.status(400).send("user existed");
    user = new User(_.pick(req.body,["name","email","password","isAdmin"]));
      let salt = await bcrypt.genSalt(10);
         user.password=await   bcrypt.hash(user.password,salt)

    await user.save();
    const token = user.generateAuthoken()
    res.header('x-auth-token',token).send(_.pick(user,["_id","name","email","isAdmin"]));
});
router.get('/',async (req,res)=>{
  const user = await User.find({})
  res.send(user)
})

module.exports = router;