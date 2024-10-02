const express = require('express');
const router = express.Router();
const { getSkills, skillSearch, skillInfo } = require('../controller/skillController');

router.get('/skills', getSkills);
router.get('/skillSearch', skillSearch);
router.get('/skillInfo', skillInfo);

module.exports = router;
