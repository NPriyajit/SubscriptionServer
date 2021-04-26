const mongoose=require('mongoose');


 const subscriptionSchema = new mongoose.Schema(
        {
            name:String,
            status: String,
            dateOfEnd:String,
            dateOfSubscription:String,
            daysLeft:String
        });

  //Models
const Subscription = new mongoose.model("Subscription", subscriptionSchema);

module.exports=Subscription