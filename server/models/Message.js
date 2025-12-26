const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: [true, 'Sender ID is required.']
    },
    receiverId: {
        type: String, 
        required: [true, "Receiver ID is required."]
    },
    content: {
        type: String,
        required: [true, "Content is required."]
    },
    isSeen: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent"
    },
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
