const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("./../models/UserModel");


router.get("/",(req,res)=>{
    res.json({
        status: "Sucess",
        message : "The backend is working fine. "
    })
})

router.get("/home",(req,res)=>{
    res.json({
        status: "Sucess",
        message : "The backend is working fine. "
    })
    res.send({
        status: "Sucess",
        message : "The backend is working fine. "
    })
})
router.post('/signup',(req,res)=>{
let {name,email,password} = req.body;

name =name.trim();
email = email.trim();
password = password.trim();

if(name =="" || email ==""|| password ==""){
    res.json({
        status: "Failed",
        message : "An Input field is Empty! Please fill It and Submit Again. "
    });
}else if (!/^[a-zA-Z]*$/.test(name)){
    res.json({
        status:"Failed",
        message:"Name must only contain alphabets."
    })
}else if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)){
    res.json({
        status:"Failed",
        message:"The email id entered is invalid. Please enter the correct email and submit."
    })
} else if(password.length < 8 ){
    res.json({
        status:"Failed",
        message:"The password must be greater than 8 letters."
    })
}else {
    User.find({email}).then(result =>{
        if(result.length>0){
            res.json({
                status:"Failed",
                message:"User Already exists with the email"
            })
        }else{
            // Pass Encrypt 
            const salt = 10;
            bcrypt.hash(password,salt).then(hashed =>{
                const user1 = new User({
                    username : name,
                    email: email,
                    password: hashed
                })
                user1.save().then(result=>{
                    res.json({
                        status: "SUCCESS",
                        message :"user Saved",
                        data:result
                    })
                })
            }).catch(err=>{
                res.json({
                    status:"Failed",
                    message:"Error while Encrypting password"
                })
            })
           
        }
    }).catch(err=>{
        res.json({
            status:"Failed",
            message:"An error occured in database"
        })
    })
}
})

router.post('/signin',(req,res)=>{
let {email,password} = req.body;
User.find({email}).then(resultData=>{
    console.log(resultData)

    if(resultData.length==0){
        res.json({
            status:"Failed",
            message: "No User with this email exists."
        })
    }else{
        bcrypt.compare(password,resultData[0].password).then(result=>{
            if(result){
                res.json({
                    status:"SUCCESS",
                    message:"User authenticated",
                    data:resultData
                })
            }else{
                res.json({
                    status:"Failed",
                    message:"Password is Incorrect."
                })
            }
        }).catch(err=>{
            res.json({
                status:"Failed",
                message:"Error in decryption"
            })
        })
    
    }
})

})

router.post("/saveData",(req,res)=>{
    var saveList = req.body;
    var email = req.body;

    let result = User.findOne({email:email});
        
    User.findOneAndUpdate({email:email}, update);
})



module.exports = router;