const mongoose = require('mongoose');

const BattleRunSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    problemSlug: {
        type: String,
        required: true,
    },
    problemTitle: {
        type: String,
        required: true
    },
    timeTakenSeconds: {
        type: Number,
        required: true,
    },
    codeLanguage: {
        type: String,
        default: 'javascript'
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Index for fast leaderboard lookups
BattleRunSchema.index({ problemSlug: 1, timeTakenSeconds: 1 });

module.exports = mongoose.model('BattleRun', BattleRunSchema);
