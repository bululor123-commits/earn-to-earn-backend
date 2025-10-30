const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Top 10 leaderboard
router.get('/', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ coins: -1 }).limit(10).select('username coins level');
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
