const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    nome: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    endereco: { type: String, required: true },
    latlng: { type: String, required: true },
    iban: { type: Number, required: true },
    NIF: { type: Number, required: true, unique: true }


});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
