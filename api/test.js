const mongoose  = require('mongoose');
uri = "mongodb+srv://Test:Test@pdf-cluster.obw3a.mongodb.net/?retryWrites=true&w=majority";
// var uri = "mongodb://localhost:27017/userDb" 
mongoose.connect(uri, ).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("./../models/UserModel");

var saveList = [ {
    _id: 0,
    text: 'no please',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    }
  },{
    _id: 1,
    text: 'not hello',
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    }
}];
var newChat = false
var email = "ert@test.com";
const a =async ()=>{
  let result =  await User.findOne({email:email});
  
  let result2 =  await User.find({email:email});
  // console.log(result2)
  console.log("2: ",result2[0].article)
  result2[0].article.push("hello")
  console.log(result2[0]);
}
    
a();