const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    user: { type: String, required: true },
    valor: { type: Number, required: true },
    estado: { type: String }
});

module.exports = mongoose.model('Donation', donationSchema);