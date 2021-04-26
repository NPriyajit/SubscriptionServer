const mongoose=require('mongoose'), Schema=mongoose.Schema;
const Subscription=require('./Subscription');



  const subscriptionSchema = new mongoose.Schema(
    {
        name:String,
        status: String,
        dateOfEnd:String,
        dateOfSubscription:String,
        daysLeft:String
    });

    const userSchema = new mongoose.Schema({
        name:String,
        dob:String,
        email:String,
        password:String,
        subscriptions: [subscriptionSchema],
      });

  //Models
const User = new mongoose.model("User", userSchema);

module.exports=User