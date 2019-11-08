const express= require('express');
const joi = require('joi');
const mongoose = require('mongoose');



var customerSchema = new mongoose.Schema({
    customername :{
        type:String,
        required: true
    },
    phonenum :{
        type:String,
        required:true,
        minlength :5,
        maxlength :50
    }
});
var Customer = mongoose.model("Customer", customerSchema)

function validateCustomer(Customer){
    const schema ={
        customername:joi.string().min(5).required(),
        phonenum : joi.number().min(5).required()

    }
    return joi.validate(Customer, schema);

}

exports.Customer = Customer;
exports.validate =validateCustomer;

