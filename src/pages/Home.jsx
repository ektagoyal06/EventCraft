import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiEye, FiEyeOff } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaChartLine,
  FaUsers,
  FaBell,
  FaTicketAlt,
  FaTachometerAlt,
} from 'react-icons/fa';

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role.toLowerCase());
    }
  }, [darkMode]);

  const handleEventCreationClick = () => {
    if (userRole !== 'organizer') {
      alert('❌ Access denied: Only organizers can create events.');
      return;
    }
    navigate('/create-event');
  };

  return (
    <div className="font-sans text-gray-800 dark:text-gray-200 dark:bg-gray-900 min-h-screen">

      {/* Theme Toggle + Dashboard */}
      <div className="absolute top-4 right-4 z-50 flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl text-yellow-500 hover:text-yellow-400 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <button
          onClick={() => {
            if (userRole === 'organizer') {
              navigate('/dashboardorg');
            } else {
              navigate('/dashboardPage');
            }
          }}
          title="Go to Dashboard"
          className="text-2xl text-blue-500 hover:text-blue-400 transition"
        >
          <FaTachometerAlt />
        </button>

      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">EventCraft</h1>
        <p className="text-xl mb-6">Seamless Planning. Flawless Execution.</p>
        <div className="flex justify-center gap-4">
          <Link to="/events" className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700">
            Explore Events
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Event Creation Feature (only for Organizers) */}
          <div
            onClick={handleEventCreationClick}
            title="Choose event category to proceed"
            className="cursor-pointer"
          >
            <Feature
              icon={<FaCalendarAlt />}
              title="Event Creation"
              desc="Easily create and manage event listings with media, schedules & more."
            />
          </div>

          <Link to="/events">
            <Feature icon={<FaTicketAlt />} title="RSVP & Ticketing" desc="Manage reservations, send digital tickets, and track attendees." />
          </Link>

          <Link to="/roles">
            <Feature icon={<FaUsers />} title="User Roles" desc="Dashboards tailored for Admins, Organizers, and Attendees." />
          </Link>

          <Link to="/calendar-reminders">
            <Feature icon={<FaBell />} title="Reminders" desc="Email & SMS reminders with integrated calendar views." />
          </Link>

          {/* <Link to="/analytics">
            <Feature icon={<FaChartLine />} title="Analytics Dashboard" desc="Track engagement, attendance, and collect feedback." />
          </Link> */}

          <Link to="/live-updates">
            <Feature icon={<FaCalendarAlt />} title="Live Updates" desc="Real-time updates via Socket.IO for seamless coordination." />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-8 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold mb-12">How EventCraft Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Step number="1" title="Create Event" desc="Sign up and launch your event with a few simple steps." />
          <Step number="2" title="Manage & Promote" desc="Invite guests, manage vendors, and track progress live." />
          <Step number="3" title="Execute Smoothly" desc="Engage attendees and analyze outcomes via the dashboard." />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} EventCraft. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm mt-4">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Use</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

// Reusable Components
const Feature = ({ icon, title, desc }) => (
  <div className="bg-white dark:bg-gray-700 shadow p-6 rounded-2xl text-center hover:shadow-lg transition duration-200">
    <div className="text-indigo-600 text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="p-6 border dark:border-gray-700 rounded-2xl">
    <div className="text-indigo-600 text-3xl font-bold mb-2">{number}</div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-300">{desc}</p>
  </div>
);

export default Home;