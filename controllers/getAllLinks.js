import Url from '../models/urls.js';

export const getAllLinks = async (req, res) => {
  try {
    const links = await Url.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ ok: false, err: error.message });
  }
};