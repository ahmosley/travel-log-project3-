// eslint-disable-next-line no-unused-vars
const { Schema, model, ObjectId } = require('mongoose');

const hobbySchema = new Schema({
  message: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Hobby', hobbySchema);
