const mongoose = require('mongoose');

const campanhaSchema = mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  iban: { type: String, required: true , unique : true},
  goal: { type: Number, required: true }
});

module.exports = mongoose.model('Campanha', campanhaSchema);
