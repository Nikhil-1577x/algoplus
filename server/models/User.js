const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    leetcodeUsername: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    stats: {
        solved: { type: Number, default: 0 },
        easy: { type: Number, default: 0 },
        medium: { type: Number, default: 0 },
        hard: { type: Number, default: 0 },
    }
});

module.exports = mongoose.model('User', UserSchema);
