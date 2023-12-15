require('./config/db');

const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./api/User');
var cors = require('cors');
const app = express(); 

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended: true,}));
app.use('/user',UserRouter);
app.use(cors());


app.listen(3000,()=>{
    console.log("Server started at port 3000")
})
