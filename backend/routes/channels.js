const express = require('express');
const router = express.Router();
const channelController = require('../controllers/channelController');
const authMiddleware = require('../middlewares/authMiddleware');

// Endpoint to create a new channel (only for authenticated users)
router.post('/', authMiddleware, channelController.createChannel);

// Endpoint to list all channels (only for authenticated users)
router.get('/', authMiddleware, channelController.getChannels);

// Endpoint to get a specific channel by ID (only for authenticated users)
router.get('/:id', authMiddleware, channelController.getChannelById);

// Endpoint to update channel details (only for authenticated users)
router.put('/:id', authMiddleware, channelController.updateChannel);

// Endpoint to toggle channel active status (activate/deactivate)
router.patch('/:id/toggle', authMiddleware, channelController.toggleChannelStatus);

//Endpoint to delete a channel.
router.delete('/:id', authMiddleware, channelController.deleteChannel);

module.exports = router;
