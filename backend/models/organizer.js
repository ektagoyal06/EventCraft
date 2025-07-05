const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  password: String,
  role: String, // "User" or "Organizer"
  
});

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
