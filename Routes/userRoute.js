const router = require("express").Router();
const User = require("../Models/User");
const ObjectID = require("mongoose").Types.ObjectId;




router.get("/getById/:id", (req, res) => {
    User.findById(req.params.id,(err,result)=>{
            if (err|| result==null) return res.status(404).send("no user found")
           
              return res.status(200).send(result);
    })
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
      if (err|| result==null) return res.status(404).send("no user found")
     
        return res.status(200).send(result);
    }
  );
});

router.post("/register", (req, res) => {
  const emptyUser = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password,
  };
    User.insertMany(emptyUser,(err,result)=>{
     if(err || result==null){
         return res.status(400).send("Error while adding data")
     }
     return res.status(200).send(result)
 })
});

router.put("/update/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record found with the given id");
  }
  const updatedUser = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    password: req.body.password,
  };
  User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, (err,result) => {
    if (err) return res.status(500).send("Error while updating the recods");
    else return res.send(result)
  });
});

router.delete("/delete/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("No record found with the given id");
  }
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).send("Error while updating the recods");
  });
});

module.exports = router;
