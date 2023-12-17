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
})
router.post('/signup',(req,res)=>{
let {name,email,password} = req.body;

name =name.trim();
email = email.trim();
email = email.toLowerCase();
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
email = email.toLowerCase();
User.find({email}).then(resultData=>{
    

    if(resultData.length==0){
        res.json({
            status:"Failed",
            message: "No User with this email exists."
        })
    }else{
        bcrypt.compare(password,resultData[0].password).then(result=>{
            if(result){
                console.log(result);
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

router.post("/saveData", async (req,res)=>{
    var chatId;
    var {saveList,email} = req.body;
    // console.log(saveList);
    // console.log("length",saveList.length)
    
    if(saveList.length < 2){
        console.log("true")
        res.json({
            status:"SUCCESS",
            message:"Your Chat is too short to save",
        })
    }else{
        // console.log(saveList);
        
        var chat_title= saveList[1].text;
        var chat_description = saveList[1].text.substring(0,20)
        let result = await User.find({email:email});
        if(result.length == 0){
            chatId = 0;
        }else{
            chatId = result[0].article.length+1;

        }
        var Chat = {
        chatId:chatId,
        title:chat_title,
        time : new Date(),
        description : chat_description,
        messages:saveList
    }
    console.log(result[0])
    result[0].article.push(Chat);
    
   let newResult = await User.findOneAndUpdate({email:email},{article:result[0].article});
   await console.log("result : ",newResult);
    res.json({
        status:"SUCCESS",
        message:"Your Chat was sucessfully stored in database",
        data: newResult
    })
   
    }

})

router.post("/getData",async (req,res)=>{
    var email = req.body.email;
    console.log(email)
    let result = await User.findOne({email:email});
    if(result){
        res.json({
           status:"SUCCESS",
           message:"The Data Was fetched properly",
           data:result
        })
    }else{
        res.json({
            status:"failed",
            message:"There was an error in fetching data from the server"
         })
    }
})



module.exports = router;