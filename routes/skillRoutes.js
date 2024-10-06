const express = require('express');
const router = express.Router();
const { getSkills, skillSearch, skillInfo, addSkillPost } = require('../controller/skillController');
const { requiresAuth } = require("../middlewares/authMiddleware");

router.get('/skills', getSkills);
router.get('/skillSearch', skillSearch);
router.get('/skillInfo', skillInfo);
router.post('/addSkillPost', requiresAuth, addSkillPost);

module.exports = router;
