
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; // ✅ Make sure the file name is `Home.jsx`
import RSVPPage from './pages/RSVPPage';
import EventForm from './pages/EventForm';
import EventsPage from './pages/EventsPage';
import CalendarReminders from './pages/CalendarsReminders';
import DashboardPage from './pages/DashboardPage';
import OrganizerDashboard from './pages/Dashboard_org';
import Payment from './pages/Payment';
import SignupForm from './pages/SignupForm';
import ComedyNights from './pages/ComedyNights';
import UserProfile from './pages/UserProfile';
import LandingPage from './pages/LandingPage';
import ChatBot from './pages/ChatBot';
// import Reminder from './pages/Reminder';

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    {/* <Route path="/login" element={<Login/>} /> */}
    <Route path="/dashboardPage" element={<DashboardPage />} />
    <Route path="/dashboardorg" element={<OrganizerDashboard />} />
    <Route path="/signup" element={<SignupForm/>} />
    <Route path="/comedy" element={<ComedyNights/>} />
    <Route path="/home" element={<Home />} />
    <Route path="/create-event" element={<EventForm />} />
    <Route path="/rsvp" element={<RSVPPage />} />
    <Route path="/events" element={<EventsPage/>}/>
    <Route path="/payment" element={<Payment/>} />
    <Route path="/user" element={<UserProfile/>} />
    <Route path="/chatbot" element={<ChatBot/>} />
    <Route path="/calendar-reminders" element={<CalendarReminders />} />
  </Routes>
);

export default App;

