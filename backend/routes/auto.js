const express = require('express');
const User=require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=  require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middlewear/fetchuser');
const TOKEN="shhh";
// route 1 =>to create a user
router.post('/createuser',[body('name').isLength({min :3}),body('email').isEmail(),body('password').isLength({min :5})],async (req,res)=>{
   const error=validationResult(req);
   let success=false;
   if(!error.isEmpty()){
    return res.status(400).json({success,error: error.array()});
   }
   try{
   let user = await User.findOne({email: req.body.email})
   if(user){
    return res.status(400).json({success,error :"sorry a user already exist"})
   }
   const salt=await bcrypt.genSalt(10);
  const secpassword=await bcrypt.hash(req.body.password,salt);
   user= await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secpassword,
  })
  const data={
    user :{
      id : user.id
    }
  }
  success=true;
 const jwtdata= jwt.sign(data,TOKEN);
  res.json({success,jwtdata});
}catch (error){
  res.status(500).send("some eror noccured");
}
  
})
//authenticate a user using login end point
// route 2=> to login for a user
router.post('/login',[body('email').isEmail(),body('password').isLength({min :5})],async (req,res)=>{
  //check if there is any invalid input
  const error=validationResult(req);
  let success=false;
   if(!error.isEmpty()){
    success=false;
    return res.status(400).json({success,error: error.array()});
   }
   const {email,password}=req.body;
   try {
    let user=await User.findOne({email});
    if(!user){
      success=false
     return res.status(400).json({success,error :"try to login with correc credentials"});
    }
    const passcompare= await bcrypt.compare(password,user.password);
    if(!passcompare){
      success=false;
     return res.status(400).json({success,error :"try to login with correc credentials"});
    }
    const data={
      user :{
        id : user.id
      }
    }
   const jwtdata= jwt.sign(data,TOKEN);
   success=true;
    res.json({success,jwtdata});
   } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
   }
   
});
//route 3=> get login details using post "api/auto/getuser"
router.post('/getuser',fetchuser,async (req,res)=>{
try {
  let userId=req.user.id;
  const user =await User.findById(userId);
  res.send(user);
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error");
 }
})
module.exports =router