const express = require('express');
const dotenv = require('dotenv');
const { connectToMongoDB } = require('./utils/mongoConnection');
const { startWhatsAppListener } = require('./listener/whatsappListener');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();
app.use(express.json());

connectToMongoDB().catch((err) => {
    console.error('[Error] Failed to connect to MongoDB:', err);
    process.exit(1);
});

// API Routes

// Start WhatsApp Bot
startWhatsAppListener();

// Start Server
const PORT = process.env.PORT || 5111;
app.listen(PORT, () => {
    console.log(`🚀 ARYA API running on http://localhost:${PORT}`);
});