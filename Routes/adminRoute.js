const router = require("express").Router();
const Subscription = require("../Models/Subscription");
const ObjectID = require("mongoose").Types.ObjectId;
const Admin= require("../Models/Admin");


router.get("/getSubscriptionById/:id", (req, res) => {
  Subscription.findById(req.params.id, (err, result) => {
    if (err || result == null) return res.status(404).send("no user found");

    return res.status(200).send(result);
  });
});

router.get("/getAllSubscriptions", (req, res) => {
  Subscription.find({}, (err, result) => {
    if (err || result == null) return res.status(404).send("no user found");

    return res.status(200).send(result);
  });
});

router.post("/addSubscription", (req, res) => {
  if (req.body == null) return res.status(400).send("Error");

  Subscription.insertMany(req.body, (err, result) => {
    if (err || result == null) {
      return res.status(400).send("Error while adding data");
    }
    return res.status(200).send(result);
  });
});


router.put("/updateSubscription/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send("No record found with the given id");
    }
  
    Subscription.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {new:true},
      (err, result) => {
        if (err) return res.status(500).send("Error while updating the recods");
        else return res.send(result);
      }
    );
  });

  router.delete("/deleteSubscription/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send("No record found with the given id");
    }
    Subscription.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).send("Error while updating the recods");
     return res.status(200).send("Deleted successfully")
    });
  });

  router.post("/adminlogin", (req, res) => {
    Admin.findOne(
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
  
  router.post("/adminregister", (req, res) => {
    if (req.body == null) return res.status(400).send("Error");
  
    Admin.insertMany(req.body, (err, result) => {
      if (err || result == null) {
        return res.status(400).send("Error while adding data");
      }
      return res.status(200).send(result);
    });
  });

  router.get("/getAllAdmins", (req, res) => {
    Admin.find({}, (err, result) => {
      if (err) throw err;
      if (result.length != 0) return res.send(result);
    });
  });
  
  module.exports = router;
  