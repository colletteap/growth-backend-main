const express = require('express');
const router = express.Router();
const { getSkills } = require('../controller/skillController');

router.get('/skills', getSkills);

module.exports = router;
