const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: String,
  googleId: String,
  password: String,
  imageUrl: String,
  roles: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },

});

module.exports = model('User', userSchema);
