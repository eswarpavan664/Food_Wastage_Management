const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./keys');

const router = express.Router();
const User = mongoose.model('User');
const post=mongoose.model('Post');

router.post('/UserSignin',async (req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})

    if(user){

      await user.comparePassword(password);    
      let token = jwt.sign({userId:user._id},jwtkey)

      res.send({user,token})
    }
    else{
      let token="Not Found";
      res.send({token})
    }

})




// Admin siginin 

router.post('/UserSignup',async (req,res)=>{
   
  const {email,Password,PhoneNumber,Name,Address,Pin} = req.body;



  try{
    const user = new User({email,Password,PhoneNumber,Name,Address,Pin});
    await  user.save();
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})

  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})

router.post("/post-food",async(req,res)=>{
var status=0;
  const {Name,Fname,Quantity,City,Pin,PhoneNumber,date}=req.body;

  console.log(Name,Fname,Quantity);
  try{

    const foo=new post({Name,Fname,Quantity,City,Pin,PhoneNumber,date});
    
  await foo.save();
   status=1;

   console.log({status});

   res.send({status});
   return;


  }
catch(err){

  console.log({status:0});
  res.send({status:0});
}


})


router.post('/getposts',async(req,res)=>{

var temp=req.body.Pin;
console.log(temp);
if (temp===-1 || temp===""){
const user=await post.find()

console.log(user);
res.send(user);

}
else{
const user=await post.find({Pin:temp})

console.log(user);
res.send(user);
}


})

router.post("/getphs",async (req,res)=>{

const Pin=req.body.Pin;
console.log(Pin);
var x=new Array();
  const user = await User.find({Pin})
  console.log(user);

  for (let i of user){

    x.push(i.PhoneNumber);

  }
console.log(x);
  if (user){
console.log({x})
res.send({x});

  }
else{
  res.status(410).send(err.message);
}

})

 
module.exports = router