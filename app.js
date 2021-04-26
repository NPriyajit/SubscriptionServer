const express = require("express");
require('./utils/db');
const app = express();
const bodyParser=require('body-parser')
const User= require('./Models/User')

//Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require('./Routes/adminRoute');
app.use(bodyParser.json())



app.use("/", userRoute);
app.use('/admin',adminRoute);


app.listen(4000,()=>{
    console.log("Server started at port: "+4000);
})