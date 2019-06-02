const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    user: { type: String, required: true },
    valor: { type: Number, required: true },
    estado: { type: ['processada', 'cancelada'], default: 'em processamento' },
   // creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Donation', donationSchema);