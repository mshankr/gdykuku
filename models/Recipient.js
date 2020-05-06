const mongoose = require('mongoose')
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
})

module.exports = recipientSchema;

// create if not exist. if exist, then use the existing schema.
// mongoose.model('recipients', recipientSchema);
