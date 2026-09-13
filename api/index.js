import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
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
      const { nanoid } = await import('nanoid');
      shortId = nanoid(6);
    }

    // Standardize URL protocol if missing
    let formattedLongUrl = longUrl.trim();
    if (!/^https?:\/\//i.test(formattedLongUrl)) {
      formattedLongUrl = `https://${formattedLongUrl}`;
    }

    const newUrl = new Url({ longUrl: formattedLongUrl, shortId });
    await newUrl.save();

    const host = req.get('host');
    const protocol = req.protocol;
    const shortUrl = `${protocol}://${host}/${shortId}`;

    return res.status(201).json({
      longUrl: formattedLongUrl,
      shortId,
      shortUrl,
      clicks: 0,
      date: newUrl.date,
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

    // Ignore requests for favicon
    if (shortId === 'favicon.ico') return res.status(204).end();

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

// Delete a URL by its short ID or MongoDB _id
app.delete('/api/urls/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // If using short code: await Url.findOneAndDelete({ shortCode: id });
    // If using MongoDB _id:
    await Url.findByIdAndDelete(id);
    res.status(200).json({ message: 'URL deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete URL' });
  }
});

// Server Listener
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app; 