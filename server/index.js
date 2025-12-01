require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const BattleRun = require('./models/BattleRun');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes

// 1. Health Check
app.get('/', (req, res) => {
    res.send('Algoplus API is running 🚀');
});

// 2. Save User / Sync Stats
app.post('/api/users/sync', async (req, res) => {
    try {
        const { username, leetcodeUsername, stats } = req.body;

        let user = await User.findOne({ username });

        if (user) {
            // Update existing user
            user.stats = stats;
            user.leetcodeUsername = leetcodeUsername;
            await user.save();
        } else {
            // Create new user
            user = new User({
                username,
                leetcodeUsername,
                stats
            });
            await user.save();
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Submit a Battle Run (Ghost Mode)
app.post('/api/battle/submit', async (req, res) => {
    try {
        const { userId, username, problemSlug, problemTitle, timeTakenSeconds, codeLanguage } = req.body;

        const newRun = new BattleRun({
            userId,
            username,
            problemSlug,
            problemTitle,
            timeTakenSeconds,
            codeLanguage
        });

        await newRun.save();
        res.status(201).json(newRun);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Get Leaderboard for a Problem (Ghost Data)
app.get('/api/battle/leaderboard/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        // Get top 10 fastest runs for this problem
        const runs = await BattleRun.find({ problemSlug: slug })
            .sort({ timeTakenSeconds: 1 })
            .limit(10);

        res.json(runs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
