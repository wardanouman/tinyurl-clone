import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// URL Schema & Model Definition
const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);

// API Route: Shorten URL
app.post('/api/shorten', async (req, res) => {
  const { longUrl, customSlug } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Long URL is required' });
  }

  try {
    let shortId = customSlug ? customSlug.trim() : null;

    if (shortId) {
      const existing = await Url.findOne({ shortId });
      if (existing) {
        return res.status(400).json({ error: 'Custom alias already in use' });
      }
    } else {
      // Import nanoid dynamically if needed or generate a random fallback string
      const { nanoid } = await import('nanoid');
      shortId = nanoid(6);
    }

    const newUrl = new Url({ longUrl, shortId });
    await newUrl.save();

    const origin = req.headers.origin || `https://${req.headers.host}`;
    return res.status(201).json({
      longUrl,
      shortId,
      shortUrl: `${origin}/${shortId}`,
    });
  } catch (err) {
    console.error('Error shortening URL:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// API Route: Get All Shortened URLs / History
app.get('/api/urls', async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 });
    return res.json(urls);
  } catch (err) {
    console.error('Error fetching URLs:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Short URL Redirection Route (Handles /:shortId)
app.get('/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });

    if (url) {
      url.clicks += 1;
      await url.save();
      return res.redirect(url.longUrl);
    }

    return res.status(404).send('Short URL not found');
  } catch (err) {
    console.error('Redirect error:', err);
    return res.status(500).send('Server error');
  }
});

// Local Development Server Listener
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Vercel Serverless Function
export default app;