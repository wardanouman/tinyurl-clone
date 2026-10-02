import express from 'express';
import {SaveURL} from '../controllers/SaveURL.js';
import {getAllLinks} from '../controllers/getAllLinks.js';
import {RedirectURL} from '../controllers/RedirectURL.js';



const router = express.Router();

router.post('/shorten', SaveURL);
router.get('/:shortId', RedirectURL);

router.post('/save',SaveURL);
router.get('/urls',getAllLinks);


export default router;