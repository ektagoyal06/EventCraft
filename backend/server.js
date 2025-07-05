const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ✅ Mongoose Models
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  price: String,
  location: String,
  description: String,
  posterImage: String,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ Add this line
});
const Event = mongoose.model('Event', eventSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['User', 'Organizer'], required: true },
});
const User = mongoose.model('User', userSchema);

const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'Organizer' }, // ✅ Added role
});
const Organizer = mongoose.model('Organizer', organizerSchema);

// 📥 POST: User Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, contact, password, role } = req.body;
    if (!name || !email || !contact || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = new User({ name, email, contact, password, role });
    await newUser.save();

    res.status(201).json({ message: '✅ User registered successfully!', user: newUser });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// 📥 POST: Organizer Signup
app.post('/api/signup/organizer', async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    if (!name || !email || !contact || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingOrganizer = await Organizer.findOne({ email });
    if (existingOrganizer) {
      return res.status(409).json({ error: 'Organizer already exists' });
    }

    const newOrganizer = new Organizer({ name, email, contact, password, role: 'Organizer' }); // ✅ Explicit role
    await newOrganizer.save();

    res.status(201).json({ message: '✅ Organizer registered successfully!', organizer: newOrganizer });
  } catch (err) {
    console.error('❌ Organizer signup error:', err);
    res.status(500).json({ error: 'Server error during organizer signup' });
  }
});

// 🖼️ Multer setup for event poster image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|avif/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// 📥 POST: Create Event
app.post('/api/events', upload.single('poster'), async (req, res) => {
  try {
    const { title, date, time, price, location, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Poster image is required' });

    const newEvent = new Event({
      title,
      date,
      time,
      price,
      location,
      description,
      posterImage: req.file.filename,
      organizerId: req.body.organizerId,
    });

    await newEvent.save();
    res.status(201).json({ message: '✅ Event saved successfully!' });
  } catch (err) {
    console.error('❌ Error saving event:', err);
    res.status(500).json({ error: 'Server error saving event' });
  }
});

// 📤 GET: All dynamic events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    console.error('❌ Error fetching events:', err);
    res.status(500).json({ error: 'Server error fetching events' });
  }
});

// ✅ Static Events
const staticEvents = [
  { title: 'Kisi Ko Batana Mat Ft. Bassi' },
  { title: 'Banger Issues ft. Kaustubh' },
  { title: 'Comedy Nights @Comedy County' },
  { title: 'Daily Ka Kaam Hai By Aakash Gupta' },
  { title: 'Dating Game Show' },
  { title: 'Adult Jokes Only' },
  { title: 'Practice' },
  { title: 'Adventure Island Delhi' },
  { title: 'Worlds of Wonder' },
  { title: 'Snow Masti' },
  { title: 'TimeZone' },
];

// 📤 GET: Combined Events (Static + DB)
app.get('/api/combined-events', async (req, res) => {
  try {
    const dbEvents = await Event.find();
    const customEvents = dbEvents.map(e => ({ title: e.title }));
    const allEvents = [...staticEvents, ...customEvents];
    res.status(200).json(allEvents);
  } catch (err) {
    console.error('❌ Error combining events:', err);
    res.status(500).json({ error: 'Server error fetching combined events' });
  }
});

// 🔐 POST: Login Route
app.post('/api/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 📤 GET: Get User Info by Email (for Profile)
app.get('/api/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });
  } catch (err) {
    console.error('❌ Profile fetch error:', err);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// 📤 GET: Events created by a specific organizer
app.get('/api/events/organizer/:organizerId', async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.params.organizerId });
    res.status(200).json({ events });
  } catch (err) {
    console.error('❌ Error fetching organizer events:', err);
    res.status(500).json({ error: 'Server error fetching organizer events' });
  }
});


// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
