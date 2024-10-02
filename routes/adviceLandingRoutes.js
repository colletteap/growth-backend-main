const express = require('express');
const router = express.Router();
const { getAdviceLanding, getAskAdviceCardData } = require('../controller/adviceLandingController');

router.get('/adviceLanding', getAdviceLanding);
router.get('/askAdviceCardData', getAskAdviceCardData);

module.exports = router;
