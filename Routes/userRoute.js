const router = require("express").Router();
const User = require("../Models/User");
const ObjectID = require("mongoose").Types.ObjectId;

const _ = require('lodash');

router.get("/getById/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err || result == null) return res.status(404).send("no user found");
   result.subscriptions=[...new Map(result.subscriptions.map(item => [item.name, item])).values()];
    return res.status(200).send( result);
  });
});

router.get("/getAll", (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw err;
    if (result.length != 0) return res.send(result);
  });
});


router.post("/login", (req, res) => {
  User.findOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    (err, result) => {
      if (err || result == null) return res.status(404).send("no user found");
      
      return res.status(200).send(result);
    }
  );
});

router.post("/register", (req, res) => {
  if (req.body == null) return res.status(400).send("Error");

  User.insertMany(req.body, (err, result) => {
    if (err || result == null) {
      return res.status(400).send("Error while adding data");
    }
    return res.status(200).send(result);
  });
});

router.put("/update/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record found with the given id");
  }

  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    {new:true},
    (err, result) => {
      if (err) return res.status(500).send("Error while updating the recods");
      else return res.send(result);
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record found with the given id");
  }
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).send("Error while updating the recods");
     return res.status(200).send("Deleted successfully")
  });
});


router.put("/subscribe/:id",(req,res)=>{
  let subscription=req.body;
  User.findById(req.params.id, (err, result) => {
    const newUser={
      name:result.name,
      dob:result.dob,
      email:result.email,
      password:result.password,
      subscriptions: [
        ...result.subscriptions, subscription
      ],
    };
   newUser.subscriptions.push(subscription);
    User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      {new:true},
      (err, resulte) => {
        if (err) return res.status(500).send("Error while updating the recods");
        else return res.send(resulte);
      }
    );
  });

})

module.exports = router;
