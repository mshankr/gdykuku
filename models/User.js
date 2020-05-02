const mongoose = require('mongoose')
const { Schema } = mongoose;

// mongodb allow different indiscriminate propterties, but
// mongoose wants to know all the possible properties we will have
// so we define them here

const userSchema = new Schema({
  googleId: String
})

// create if not exist. if exist, then use the existing schema.
mongoose.model('users', userSchema);
