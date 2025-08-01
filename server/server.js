import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Connect to the database  
connectDB();        

// Middleware       
app.use(cors());
app.use(express.json());    
// Routes

app.use('/api/auth',authRoutes);
app.use('/api/reviews',  reviewRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  