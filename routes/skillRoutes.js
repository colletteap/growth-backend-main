const express = require('express');
const router = express.Router();
const { getSkills, skillSearch } = require('../controller/skillController');

router.get('/skills', getSkills);
router.get('/skillSearch', skillSearch);

module.exports = router;
