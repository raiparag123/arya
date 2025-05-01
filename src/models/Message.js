const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    messageText: { type: String, required: true },
    timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
