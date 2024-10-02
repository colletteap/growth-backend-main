const express = require('express');
const router = express.Router();
const { getBlogLanding, getBlogPageData } = require('../controller/blogLandingController');

router.get('/blogLanding', getBlogLanding);
router.get('/blogPageData', getBlogPageData);

module.exports = router;
