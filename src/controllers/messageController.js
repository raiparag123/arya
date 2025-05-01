const Message = require('../models/Message');

const saveMessage = async (req, res) => {
    try {
        const { senderId, messageText, timestamp } = req.body;

        // const message = new Message({ senderId, messageText, timestamp });
        // await message.save();

        res.status(201).json({ success: true, message: 'Message saved.' });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
};

module.exports = { saveMessage };
