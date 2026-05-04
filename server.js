import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// ❌ REMOVE: connectDB();

// ✅ ADD THIS HERE (right after imports / before routes)
let isConnected = false;

const startDB = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

startDB();

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ❌ REMOVE app.listen()

export default app;
