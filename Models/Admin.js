const mongoose=require('mongoose'), Schema=mongoose.Schema;

const adminSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
  });

    //Models
const Admin = new mongoose.model("Admin", adminSchema);

module.exports= Admin;