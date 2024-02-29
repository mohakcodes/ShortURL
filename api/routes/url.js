const express = require('express');
const { generateShortUrl, fetchMainLink, fetchStat, fetchStats } = require('../controllers/url');
const router = express.Router();

router.post('/' , generateShortUrl);
router.get('/:shortId' , fetchMainLink);
router.get('/stats/:shortId' , fetchStat);
router.get('/history' , fetchStats);

module.exports = router;