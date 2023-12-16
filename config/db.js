const mongoose  = require('mongoose');
uri = "mongodb+srv://Test:Test@pdf-cluster.obw3a.mongodb.net/?retryWrites=true&w=majority";
// var uri = "mongodb://localhost:27017/userDb" 
mongoose.connect(uri, ).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
})