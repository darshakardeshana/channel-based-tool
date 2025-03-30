const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoint to add or update a reaction
router.post('/', authMiddleware, reactionController.addOrUpdateReaction);

// Endpoint to delete a reaction by its ID
router.delete('/:id', authMiddleware, reactionController.deleteReaction);

module.exports = router;
