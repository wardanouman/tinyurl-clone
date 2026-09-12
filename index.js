import dotenv from 'dotenv';
dotenv.config(); // Load environment variables BEFORE importing modules that use process.env

import express from 'express';
import cors from 'cors';
import connectDB from './utils/mongodb.js';
import urlsRouter from './routes/urls.js';
import { RedirectURL } from './controllers/RedirectURL.js';
import dns from 'dns';

dns.setServers(["1.1.1.1", "8.8.8.8"])


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// Health check route
app.get('/', (_req, res) => {
  res.send('Server is running');
});

// API Routes (e.g. POST /api/shorten, GET /api/links)
app.use('/api', urlsRouter);
app.get('/:shortId', RedirectURL); // Root redirect route (e.g., http://localhost:5050)

// Listen locally when running `node index.js`
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Required for Vercel serverless deployment
export default app;