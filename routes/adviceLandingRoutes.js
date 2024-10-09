const express = require('express');
const router = express.Router();
const { 
  getAdviceLanding, 
  getAskAdviceCardData, 
  addQuestion, 
  updateQuestion, 
  deleteQuestion,
  addComment,
  updateComment,
  deleteComment,
  getComments 
} = require('../controller/adviceLandingController');
const { requiresAuth } = require("../middlewares/authMiddleware");

// Routes for advice landing and questions
router.get('/adviceLanding', getAdviceLanding);
router.get('/askAdviceCardData', getAskAdviceCardData);

// Routes for handling questions (require authorization)
router.post('/questions', requiresAuth, addQuestion);    // Add a question
router.put('/questions/:id', requiresAuth, updateQuestion);   // Update a question
router.delete('/questions/:id', requiresAuth, deleteQuestion); // Delete a question

// Routes for handling comments (require authorization)
router.get('/comments', requiresAuth, getComments);   // Get all comments for a specific cardId
router.post('/comments', requiresAuth, addComment);   // Add a comment
router.put('/comments/:id', requiresAuth, updateComment);   // Update a comment
router.delete('/comments/:id', requiresAuth, deleteComment); // Delete a comment

module.exports = router;
