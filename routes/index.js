var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find()
    console.log('request : ', users)
    // res.json(users)
    res.render("index", { title: users });
    
  } catch(err) {
    res.status(500).json({message: err.message})
  }
});

router.post("/save", async (req, res, next) => {
  try {
    const insert = req.body 
    // console.log('Insert params : ',insert)

    const newUser = new User()
    newUser.email = insert.email
    newUser.name = insert.name
    newUser.age = insert.age
    const user = await newUser.save()
    if(user) res.json(user)
    else res.json({message:'No user'})
    
  } catch(err) {
    res.status(500).json({message: err.message})
  }
  
  console.log("save...............");
});

module.exports = router;
