

const saveMessage = async (req, res) => {
    try {
        const { senderId, messageText, timestamp } = req.body;

        res.status(201).json({ success: true, message: 'Message saved.' });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ success: false, error: 'Server error.' });
    }
};

module.exports = { saveMessage };
