// const mongoose = require('mongoose')
import mongoose from "mongoose";

const dbConnection = async ()=>{
try {
    const connection =  await mongoose.connect(process.env.MONGO_URI, {
        family: 4
    })
    console.log("mongoDb connected successfully");
    
} catch (error) {
    console.error("Database connection error:", error.message);
    
}
  
}

// module.exports = dbConnection
export default dbConnection