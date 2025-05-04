global.crypto = require('crypto');
const {
    makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason,
    downloadMediaMessage,
    downloadContentFromMessage
} = require('baileys');
const { Boom } = require('@hapi/boom');
const path = require('path');
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { saveMessage } = require('../controllers/messageController');
require('dotenv').config();

async function startWhatsAppListener() {
    const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, '../../auth'));
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        browser: ['Ubuntu', 'Chrome', '120.0.0.0'],
    });

    sock.ev.on('connection.update', (update) => {
        const { qr, connection, lastDisconnect } = update;

        if (qr) {
            console.log('📲 Scan this QR code with your WhatsApp:');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect =
                new Boom(lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed. Reconnecting:', shouldReconnect);
            if (shouldReconnect) startWhatsAppListener();
        }

        if (connection === 'open') {
            console.log('✅ Arya connected to WhatsApp');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        const msg = messages[0];
        console.log("🚀 ~ sock.ev.on ~ msg:", msg)
        //Media message handling
        /* if (['videoMessage', 'audioMessage', 'documentMessage', 'imageMessage'].some(type => msg.message?.[type])) 
              await saveMedia(msg); */

        const senderId = msg.key.remoteJid; 
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';

        console.log(`📨 From ${senderId}: ${text}`);

        try {
            await saveMessage({
                body: {
                    senderId,
                    messageText: text,
                    timestamp: new Date(),
                }
            }, {
                status: () => ({ json: () => {} }) // Dummy response object
            });
            
        } catch (err) {
            console.error('❌ Failed to send to API:', err.message);
        }
    });
        
        

    sock.ev.on('creds.update', saveCreds);
}

const saveMedia = async (msg) => {
    console.log('📥 Media message received');

    const mediaType = msg.message.videoMessage
    ? 'video'
    : msg.message.audioMessage
    ? 'audio'
    : msg.message.documentMessage
    ? 'document'
    : 'image';

    const stream = await downloadContentFromMessage(
    msg.message[`${mediaType}Message`],
    mediaType
    );

    const buffer = [];

    for await (const chunk of stream) {
    buffer.push(chunk);
    }

    const finalBuffer = Buffer.concat(buffer);
    const fileExtension =
    mediaType === 'document'
        ? msg.message.documentMessage.fileName.split('.').pop()
        : mediaType === 'image'
        ? 'jpg'
        : mediaType;
    const filePath = path.join(__dirname, `downloaded_${mediaType}.${fileExtension}`);
    fs.writeFileSync(filePath, finalBuffer);

    console.log(`✅ ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)} saved to:`, filePath);
}


module.exports = { startWhatsAppListener };

