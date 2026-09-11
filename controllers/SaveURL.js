import URLs from '../models/urls.js';
import {generateShortId} from '../utils/Keys.js';

export const SaveURL = async (req, res) => {
    const { longUrl } = req.body;
    try {
        const shortId = generateShortId(8);
        const newURL = new URLs({ longUrl : longUrl,shortId: shortId });
        await newURL.save();
        const shortUrl ='http://localhost:5050/' + shortId;
        res.status(201).json({ 
        ok: true,
        shortUrl,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error saving URL',
            error: error.message,
        }); 
    }
    }    