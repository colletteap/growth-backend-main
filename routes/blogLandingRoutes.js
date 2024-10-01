const express = require('express');
const router = express.Router();
const { getBlogLanding } = require('../controller/blogLandingController');

router.get('/blogLanding', getBlogLanding);

module.exports = router;
