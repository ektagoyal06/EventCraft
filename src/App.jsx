import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // ✅ Make sure the file name is `Home.jsx`
import RSVPPage from './pages/RSVPPage';
import CalendarReminders from './pages/CalendarsReminders';


const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/rsvp" element={<RSVPPage />} />
    <Route path="/calendar-reminders" element={<CalendarReminders />} />
  </Routes>
);

export default App;
