const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 