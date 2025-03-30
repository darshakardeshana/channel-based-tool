const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new question
router.post('/', authMiddleware, questionController.createQuestion);

// Get all questions
router.get('/', authMiddleware, questionController.getQuestions);

router.get('/channel/:channelId', authMiddleware, questionController.getQuestionsByChannel);

// Get a question by its ID
router.get('/:id', authMiddleware, questionController.getQuestionById);

// Update a question
router.put('/:id', authMiddleware, questionController.updateQuestion);

// Delete a question
router.delete('/:id', authMiddleware, questionController.deleteQuestion);

module.exports = router;
