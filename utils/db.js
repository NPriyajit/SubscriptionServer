const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/Subscription";

mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => {    
        console.info("INFO: Connected to DB");
    }
  );

  
  