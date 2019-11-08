const {Customer, validate} = require('../models/customermodel');
const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const joi = require('joi');
const  auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/',auth,async (req,res)=>{
    
    const {error} = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    let customer =await Customer.findOne({customername : req.body.customername});
    if(customer) return res.status(400).send("customer Exists");
    
    customer = new Customer(_.pick(req.body,["customername"],"phonenum"));

    await customer.save();
    res.send(_.pick(customer,["customername","phonenum"]));
});

router.get('/', async (req,res)=>{
    let customer = await Customer.find({});
    res.send(customer);
})

router.get('/:id', async (req,res)=>{
    let customer = await Customer.findById(req.params.id);
    if(!Customer) return res.status(404).send("customer does not Exist!");
    res.send(customer);
});
router.put('/:id',[auth, admin],async (req,res)=>{
    const {error} = validateUpdate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id,{customername :req.body.customername},{
        new :true
    }) 
    if(!customer) return res.status(404).send("customer does not Exist!");

    res.send(customer);
})
router.delete('/:id',[auth,admin],async (req,res)=>{

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send("customer does not Exist!");
    res.send(customer);
})
 function validateUpdate(req){
     const schema ={
         customername : joi.string().min(5).required()
     }
     return joi.validate(req,schema);
 }

module.exports = router;