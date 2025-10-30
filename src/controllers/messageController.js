const { saveMessageToDB } = require('../services/whatsappMessage');

const saveMessage = async (req, res) => {
    try {
        const { msg } = req.body;

        // Save the message to the database
        const result = await saveMessageToDB(msg);

        res.status(201).json({ success: true, message: 'Message saved.', data: result });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
};

module.exports = { saveMessage };
