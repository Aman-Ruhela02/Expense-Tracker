import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const app = express();
import expenseRouters from './routes/expenseRoute.js'
import authRouters from './routes/authRoute.js'
import dbConnection from './config/db.js'
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8000 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['https://expense-tracker-5vz4.onrender.com', 'http://localhost:5173']
}))

dbConnection()
app.use('/api/v2/expense',expenseRouters)
app.use('/api/v2/auth', authRouters)

// Serve frontend static files
const frontendPath = path.join(__dirname, '../Frontend/client/dist');
app.use(express.static(frontendPath));

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

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

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
    console.error(err.name, err.message, err.stack);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
    console.error(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});



