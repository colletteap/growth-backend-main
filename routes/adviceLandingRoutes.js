const express = require('express');
const router = express.Router();
const { getAdviceLanding, getAskAdviceCardData } = require('../controller/adviceLandingController');
const { requiresAuth } = require("../middlewares/authMiddleware");

router.get('/adviceLanding', getAdviceLanding);
router.get('/askAdviceCardData', getAskAdviceCardData);
//router.post('/comment', requiresAuth, );
//router.put('.comment/:id', requiresAuth, );
//router.delete('/comment/:id, requiresAuth, );

module.exports = router;
