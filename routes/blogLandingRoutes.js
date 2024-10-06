const express = require('express');
const router = express.Router();
const { getBlogLanding, getBlogPageData, getUrls } = require('../controller/blogLandingController');

router.get('/blogLanding', getBlogLanding);
router.get('/blogPageData', getBlogPageData);
router.get('/urls', getUrls);

module.exports = router;
