// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.get('/skills', skillController.getSkills);
router.post('/skills', skillController.addSkill);

module.exports = router;
