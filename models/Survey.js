const mongoose = require('mongoose')
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema], // means array of Strings!
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // _ indicate BELONGING TO the users schema!
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
})

// create if not exist. if exist, then use the existing schema.
mongoose.model('surveys', surveySchema);
