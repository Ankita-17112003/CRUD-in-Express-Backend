const mongoose = require("mongoose")
 const connection = async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)

        console.log("DB connection sucessfully....",mongoose.connection.readyState);
        

    }catch(err){
        console.log("DB connection failed....",mongoose.connection.readyState);
        console.log(err);
        
    }
 }
 connection()

 module.export = connection