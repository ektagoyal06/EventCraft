<<<<<<< HEAD
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
=======
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
>>>>>>> 87a766492b4d90c9d5291afe21c40a8a81105199
