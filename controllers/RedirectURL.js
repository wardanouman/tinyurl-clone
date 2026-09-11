import URLs from '../models/urls.js';

export const RedirectURL = async (req, res) => {
    const { shortId } = req.params; 
    try {
        const urlRecord = await URLs.findOne({ shortId: shortId });
        if (!urlRecord) {
            return res.status(404).json({
                ok: false,
                message: 'Short URL not found',
            });
        }
        return res.redirect(urlRecord.longUrl);
    } catch (error) {
        res.status(500).json({
            ok: false,  
            err: error.message,
        });
    }   
};