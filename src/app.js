const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { startWhatsAppListener } = require('./listener/whatsappListener');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// Connect MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log('✅ MongoDB Connected');
// }).catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
// });

// API Routes
app.use('/api/messages', messageRoutes);

// Start WhatsApp Bot
startWhatsAppListener();

// Start Server
const PORT = process.env.PORT || 5111;
app.listen(PORT, () => {
    console.log(`🚀 ARYA API running on http://localhost:${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { startWhatsAppListener } = require('./listener/whatsappListener');
// const messageRoutes = require('./routes/messageRoutes');

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Connect MongoDB
// // mongoose.connect(process.env.MONGODB_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(() => {
// //     console.log('✅ MongoDB Connected');
// // }).catch((err) => {
// //     console.error('❌ MongoDB connection error:', err);
// // });

// // Routes
// app.use('/api/messages', messageRoutes);

// // Start WhatsApp Listener
// startWhatsAppListener();

// // Start Express Server
// const PORT = 5100;
// app.listen(PORT, () => {
//     console.log(`🚀 ARYA API running at http://localhost:${PORT}`);
// });
