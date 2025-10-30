const { MongoClient } = require('mongodb');
const { MONGO_CONFIG } = require('../config/MONGO_CONFIG.js');

const { CONNECTION_URI, MONGO_DBNAME } = MONGO_CONFIG;

let mongoClientDB;

const connectToMongoDB = async () => {
    if (!mongoClientDB) {
        const mongoClientUse = new MongoClient(CONNECTION_URI);
        await mongoClientUse.connect();
        console.log('✅  Connected to MongoDB');
        mongoClientDB = mongoClientUse.db(MONGO_DBNAME);
    }
    return mongoClientDB;
};

module.exports = { connectToMongoDB, getMongoDB: () => mongoClientDB };