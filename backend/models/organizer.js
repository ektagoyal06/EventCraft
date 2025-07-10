<<<<<<< HEAD
const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  contact: String,
  password: String,
  role: String, // "User" or "Organizer"
  
});

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
=======
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
>>>>>>> 87a766492b4d90c9d5291afe21c40a8a81105199
