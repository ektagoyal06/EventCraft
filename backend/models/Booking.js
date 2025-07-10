<<<<<<< HEAD
// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventName: String,
  eventDate: String,
  location: String,
  image: String,
  quantity: Number,
  price: Number,
  total: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userEmail: String,
  userContact: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
=======
// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  eventName: String,
  eventDate: String,
  location: String,
  image: String,
  quantity: Number,
  price: Number,
  total: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userEmail: String,
  userContact: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
>>>>>>> 87a766492b4d90c9d5291afe21c40a8a81105199
