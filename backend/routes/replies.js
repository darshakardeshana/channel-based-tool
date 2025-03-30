const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new reply
router.post('/', authMiddleware, replyController.createReply);

// Retrieve nested replies for a question using query parameter ?questionId=1
router.get('/nested', authMiddleware, replyController.getNestedRepliesByQuestion);

// Retrieve a specific reply by its ID
router.get('/:id', authMiddleware, replyController.getReplyById);

// Update a reply
router.put('/:id', authMiddleware, replyController.updateReply);

// Delete a reply
router.delete('/:id', authMiddleware, replyController.deleteReply);

// Optionally: Retrieve all replies for a given question (e.g., /api/replies?questionId=1)
router.get('/', authMiddleware, replyController.getRepliesByQuestion);


module.exports = router;
