const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routes/users');
const login = require('./routes/login');
const customer = require('./routes/customerroutes');
const config = require('config');


if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtprivatekey is not defined');
    process.exit(1);
}
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/signup', router);
app.use('/login', login);
app.use('/customer',customer);
mongoose.connect("mongodb://localhost:27017/sudhakar",{useNewUrlParser: true})

.then(console.log("db connected"));

app.listen(3000, ()=>{
    console.log("listen on 3000");
})