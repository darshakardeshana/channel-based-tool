const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// User profile routes (accessible to authenticated users)
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Admin routes (accessible only to authenticated admin users)
router.get('/admin/users', authMiddleware, adminMiddleware, userController.getAllUsers);
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, userController.deleteUser);

module.exports = router;
