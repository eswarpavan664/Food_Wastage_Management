const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


 

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Pin:{
        type:String,
        required:true
    },
})

const PostSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    
    Fname:{
        type:String,
        required:true
    },
    
    Quantity:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    
    Pin:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }

})

 
 

 

UserSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('Password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.Password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.Password = hash;
         next()
     })

    })

})


 

UserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.Password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}



 

mongoose.model('Post',PostSchema);
 
mongoose.model('User',UserSchema);
 
 
 