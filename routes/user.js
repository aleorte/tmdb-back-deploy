const express = require("express");
const passport = require("passport");
const {User} = require("../models");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const {email}=req.body
  User.findOne({where:{email}}).then(user=>{
    if(user===null){
      User.create(req.body).then((user) => res.status(201).send(user));
    }
  })
  })
    
  
;

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

userRouter.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

userRouter.get("/me", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
});

module.exports = userRouter;
