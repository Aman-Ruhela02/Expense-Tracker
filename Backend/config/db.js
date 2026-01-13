// const mongoose = require('mongoose')
import mongoose from "mongoose";

const dbConnection = async ()=>{
try {
    const connection =  await mongoose.connect(process.env.MONGO_URI)
    console.log("mongoDb connected successfully");
    
} catch (error) {
    console.log("Database connection error");
    
}
  
}

// module.exports = dbConnection
export default dbConnection