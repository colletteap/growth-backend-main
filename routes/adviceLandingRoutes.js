const express = require('express');
const router = express.Router();
const { getAdviceLanding } = require('../controller/adviceLandingController');

router.get('/adviceLanding', getAdviceLanding);

module.exports = router;
