const { mongoInsertOne } = require('../models/MongoDB');

/**
 * Save a WhatsApp message to the database.
 * @param {Object} msg - The message object from Baileys.
 * @returns {Promise<Object>} - The result of the database insertion.
 */
const saveMessageToDB = async (msg) => {
    try {
        // Destructure the necessary fields from the message object
        const {
            key: { remoteJid: sender, fromMe },
            message,
            messageTimestamp,
        } = msg;
        console.log("🚀 ~ saveMessageToDB ~ msg:", JSON.stringify(msg));

        const text =
            message?.conversation ||
            message?.extendedTextMessage?.text ||
            '';

        const receiver = fromMe ? sender : '918108289914@s.whatsapp.net'; // Replace with your WhatsApp ID

        // Prepare the document to insert
        const doc = {
            msg: text,
            date: new Date().getTime(),
            sender,
            receiver,
            status: 'received', // Default status
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // Insert the message into the database
        const result = await mongoInsertOne('whatsappMessages', doc);
        return result;
    } catch (err) {
        console.error('Error saving message to database:', err);
        throw new Error('Failed to save message to database.');
    }
};

module.exports = { saveMessageToDB };