const mongoose = require('mongoose');

const { Schema } = mongoose;

const hobbySchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
});
  
  const Hobby = mongoose.model('Hobby', hobbySchema);
  
  module.exports = Hobby;