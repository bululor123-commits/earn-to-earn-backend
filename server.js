const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const rewardRoutes = require('./routes/reward');
const leaderboardRoutes = require('./routes/leaderboard');
const cors = require('cors');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/reward', rewardRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
