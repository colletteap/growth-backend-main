const express = require('express');
const router = express.Router();
const { 
  getAdviceLanding, 
  getAskAdviceCardData,
  getQuestions, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion,
  addComment,
  updateComment,
  deleteComment,
  getCommentsByCardId
} = require('../controller/adviceLandingController');
const { requiresAuth } = require("../middlewares/authMiddleware");

// Routes for advice landing and questions
router.get('/adviceLanding', getAdviceLanding);
router.get('/askAdviceCardData', getAskAdviceCardData);

// Routes for handling questions (require authorization)
router.get('/questions', getQuestions);   
router.post('/questions', requiresAuth, addQuestion);    
router.put('/questions/:cardId', requiresAuth, updateQuestion);   
router.delete('/questions/:cardId', requiresAuth, deleteQuestion); 

// Routes for handling comments (require authorization)
router.get('/comments', getCommentsByCardId);  
router.post('/comments', requiresAuth, addComment);   
router.put('/comments/:id', requiresAuth, updateComment);   
router.delete('/comments/:id', requiresAuth, deleteComment); 

module.exports = router;
