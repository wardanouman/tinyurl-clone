import Url from '../models/urls.js';

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;

  try {
    const urlRecord = await Url.findOne({ shortId });

    if (!urlRecord) {
      return res.status(404).json({
        ok: false,
        message: 'Short URL not found',
      });
    }

    // Increment click count
    urlRecord.clicks = (urlRecord.clicks || 0) + 1;
    await urlRecord.save();

    // Ensure URL has http:// or https:// before redirecting
    let destinationUrl = urlRecord.longUrl;
    if (!destinationUrl.startsWith('http://') && !destinationUrl.startsWith('https://')) {
      destinationUrl = `https://${destinationUrl}`;
    }

    return res.redirect(destinationUrl);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      err: error.message,
    });
  }
};