import mongoose from 'mongoose';
import 'dotenv/config';

console.log("Starting connection test...");
console.log("URI resolving to:", process.env.MONGO_URI ? "Found" : "Missing");

mongoose.connect(process.env.MONGO_URI, { 
    serverSelectionTimeoutMS: 5000,
    family: 4 
})
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection failed with error:");
    console.error(err);
    process.exit(1);
  });
