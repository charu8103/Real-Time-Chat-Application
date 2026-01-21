const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    room: { type: String, required: true },
    author: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    readBy: [{ type: String }] // Array of usernames who have read the message
});

module.exports = mongoose.model('Message', MessageSchema);