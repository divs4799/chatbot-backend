const mongoose  = require('mongoose');
// uri = "mongodb+srv://Test:Test@pdf-cluster.obw3a.mongodb.net/?retryWrites=true&w=majority";
var uri = "mongodb://localhost:27017/userDb" 
mongoose.connect(uri, ).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("./../models/UserModel");

var saveList = [1,2,3,5,4];
var email = "Test@abc.com";
let result;
User.findOne({email:email}).then((response)=>{
    console.log(response);
    result = response
    console.log("res :",result);    
    
    User.findOneAndUpdate({email:email}, update);
});
    