const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  dailyLogin: { type: Date, default: null },
});

module.exports = mongoose.model('User', userSchema);
