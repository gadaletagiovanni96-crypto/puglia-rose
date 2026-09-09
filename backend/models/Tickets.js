const mongoose = require('mongoose');

const ticketShcema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Fa riferimento al modello User
        required: true 
    },
    qrCodeToken: { 
        type: String, 
        required: true, 
        unique: true // Stringa casuale che genereremo all'acquisto
    },
    isScanned: { 
        type: Boolean, 
        default: false 
    },
    scannedAt: {
        type: Date
    }
}, {timestamps: true});

module.exports = mongoose.model('Ticket', ticketShcema);