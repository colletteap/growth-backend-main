const express = require('express');
const router = express.Router();
const { getSkills, skillSearch, skillInfo, addSkillPost } = require('../controller/skillController');

router.get('/skills', getSkills);
router.get('/skillSearch', skillSearch);
router.get('/skillInfo', skillInfo);
router.post('/addSkillPost', addSkillPost);

module.exports = router;
