const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  password: String,
  role: String, // "User" or "Organizer"
});

const User = mongoose.model('User', userSchema);

module.exports = User;
