const express = require('express');
const { MongoClient } = require('mongodb');
const { MONGO_CONFIG } = require('./config/MONGO_CONFIG.js');
const dotenv = require('dotenv');
const { startWhatsAppListener } = require('./listener/whatsappListener');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();
const { CONNECTION_URI, MONGO_DBNAME } = MONGO_CONFIG

const app = express();
app.use(express.json());

let mongoClientDB;

const connectToMongoDB = async () => {
    console.log('[Info] Connecting to MongoDB...');
    const mongoClientUse = new MongoClient(CONNECTION_URI);
    await mongoClientUse.connect();
    mongoClientDB = mongoClientUse.db(MONGO_DBNAME);
};

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