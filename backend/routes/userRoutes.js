const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');

// POST /api/users -> signup
router.post('/', userController.createUser);

// POST /api/users/login -> login
router.post('/login', userController.loginUser);

// GET /api/users/profile?userId=... -> public profile (by query)
router.get('/profile', userController.getProfile);

// GET /api/users/me -> authenticated user's profile
router.get('/me', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
