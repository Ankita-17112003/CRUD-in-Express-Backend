const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    "userName":String,
    "userEmail":{
        type:String,
        required:true,
        unique:true
    },
    
    "userPassword":String,
    "isEligible":Boolean,
    "userGender":{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },
    
    "createdAt":{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("user",userSchema)