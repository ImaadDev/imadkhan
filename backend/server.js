import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// Routes
import blogRoutes from './routes/blogRoutes.js';
import certificationRoutes from './routes/certificationRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import technologyRoutes from './routes/technologyRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js'

dotenv.config();
connectDB();

const app = express();

// Frontend URL from environment
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS configuration for cookies
const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'] // No Authorization header needed
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
