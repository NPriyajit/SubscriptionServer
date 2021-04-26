const mongoose=require('mongoose');


 const userSchema = new mongoose.Schema({
    name:String,
    dob:String,
    email:String,
    password:String
  });

  //Models
const User = new mongoose.model("User", userSchema);

// const emptyUser = {
//     name:'',
//     dob:'',
//     email:'',
//     password:''
//   };

// User.insertMany(emptyUser,(err)=>{
//     if(err) throw err;
//     console.log('data stored successfully');
// });

module.exports=User