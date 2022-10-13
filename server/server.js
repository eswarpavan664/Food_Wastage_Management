const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require("cors");
 
const {mogoUrl} = require('./keys');
mongoose.connect(mogoUrl)
 
require('./models');
 
const requireToken = require('./requireToken');


const authRoutes = require('./authRoutes');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(authRoutes)
 

mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("database connected ...")
})


mongoose.connection.on('error',(err)=>{
    console.log("error occered... ",err);
})

 

 
 
//customer data
app.get('/',requireToken,(res,req)=>{
    res.send({
        email:req.user.email,
        Name:req.user.Name,
        PhoneNumber:req.user.PhoneNumber
        
    })

})

app.listen(process.env.PORT || 8080,()=>{
    console.log("server is runnung on port 8080");
})