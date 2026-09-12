import express from 'express';
import {SaveURL} from '../controllers/SaveURL.js';
import {getAllLinks} from '../controllers/getAllLinks.js';

const router = express.Router();

router.post('/shorten', SaveURL);

router.post('/save',SaveURL);
router.get('/links',getAllLinks);


export default router;