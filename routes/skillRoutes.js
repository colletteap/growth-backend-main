const express = require('express');
const router = express.Router();
const { getSkills, skillSearch, skillInfo, addSkillPost, updateSkillInfo, deleteSkillPost } = require('../controller/skillController');
const { requiresAuth } = require("../middlewares/authMiddleware");

router.get('/skills', getSkills);
router.get('/skillSearch', skillSearch);
router.get('/skillInfo', skillInfo);
router.post('/addSkillPost', requiresAuth, addSkillPost);
router.put('/skillInfo/:id', requiresAuth, updateSkillInfo);
router.delete('/skillInfo/:id', requiresAuth, deleteSkillPost);

module.exports = router;
