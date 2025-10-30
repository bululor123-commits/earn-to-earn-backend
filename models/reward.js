const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Earn coins by game
router.post('/earn', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.coins += amount;
    await user.save();
    await Transaction.create({ userId, type: 'earn', amount });

    res.json({ msg: `You earned ${amount} coins!`, coins: user.coins });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Daily login bonus
router.post('/daily', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    const today = new Date().toDateString();

    if (user.dailyLogin && user.dailyLogin.toDateString() === today) {
      return res.status(400).json({ msg: 'Already claimed today' });
    }

    user.coins += 20;
    user.dailyLogin = new Date();
    await user.save();
    await Transaction.create({ userId, type: 'daily', amount: 20 });

    res.json({ msg: 'Daily bonus claimed! +20 coins', coins: user.coins });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Withdraw coins (simulated)
router.post('/withdraw', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.coins < amount) return res.status(400).json({ msg: 'Not enough coins' });

    user.coins -= amount;
    await user.save();
    await Transaction.create({ userId, type: 'withdraw', amount });

    res.json({ msg: `Withdraw ${amount} coins success`, coins: user.coins });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
