import express from 'express';
import {SaveURL} from "../controllers/SaveURL.js";
import {RedirectURL} from "../controllers/RedirectURL.js";

const router = express.Router();

router.post('/save', SaveURL);
router.get('/:shortId', RedirectURL);

export default router;