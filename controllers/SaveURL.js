import Url from '../models/urls.js';
import { generateShortId } from '../utils/Keys.js';

export const SaveURL = async (req, res) => {
  try {
    const { longUrl, customSlug } = req.body;

    if (!longUrl) {
      return res.status(400).json({ ok: false, msg: 'Long URL is required' });
    }

    let shortId = customSlug ? customSlug.trim() : generateShortId(8);

    // Check if custom slug already exists in database
    if (customSlug) {
      const existing = await Url.findOne({ shortId });
      if (existing) {
        return res.status(400).json({ ok: false, msg: 'Custom slug already taken' });
      }
    }

    // Save to MongoDB
    const newURL = new Url({ longUrl, shortId });
    await newURL.save();

    // Construct full dynamic short URL
    const protocol = req.protocol;
    const host = req.get('host');
    const shortUrl = `${protocol}://${host}/${shortId}`;

    return res.status(201).json({
      ok: true,
      shortUrl,
      shortId,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Error saving URL',
      error: error.message,
    });
  }
};