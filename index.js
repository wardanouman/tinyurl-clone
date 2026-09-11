import express from 'express';
import connectDB from './utils/mongodb.js';
import urlsRouter from './routes/urls.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
connectDB();

// API Routes
app.use('/api', urlsRouter);

// Health check route
app.get('/', (_req, res) => {
  res.send('Server is running');
});

// ⚠️ REQUIRED FOR VERCEL: Export the app instance
export default app;

// Listen locally when running node index.js
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}