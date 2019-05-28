const mongoose = require('mongoose');

const campanhaSchema = mongoose.Schema({
  title: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('Campanha', campanhaSchema);
