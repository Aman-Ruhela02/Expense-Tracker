import express from 'express'
import cors from 'cors'
const app = express();
import expenseRouters from './routes/expenseRoute.js'
import dbConnection from './config/db.js'
import 'dotenv/config';


const port = process.env.PORT || 8000 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

dbConnection()
app.use('/api/v2/expense',expenseRouters)



const server = app.listen(port,(req,res)=>{
    console.log(`server is running on the port ${port}`);
    
})

process.on("SIGINT",async()=>{
    await mongoose.connection.close();
    server.close(()=>{
        console.log("Server stopped");
        
        process.exit(1)
    })
})



