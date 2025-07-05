const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Ensure path to Event model is correct

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

router.get('/api/combined-events', async (req, res) => {
  try {
    const dbEvents = await Event.find();
    const custom = dbEvents.map(e => ({ title: e.title }));
    const all = [...staticEvents, ...custom];
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

module.exports = router;
