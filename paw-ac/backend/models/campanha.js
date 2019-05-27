const mongoose = require('mongoose');

const campanhaSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}
});

mongoose.model('Campanha', campanhaSchema);
