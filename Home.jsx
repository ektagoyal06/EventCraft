import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaChartLine, FaUsers, FaBell, FaTicketAlt } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="font-sans text-gray-800 dark:text-gray-200 dark:bg-gray-900 min-h-screen">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl text-yellow-500 hover:text-yellow-400 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">EventCraft</h1>
        <p className="text-xl mb-6">Seamless Planning. Flawless Execution.</p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow hover:bg-gray-100">
            Get Started
          </Link>
          <Link to="/events" className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700">
            Explore Events
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature icon={<FaCalendarAlt />} title="Event Creation" desc="Easily create and manage event listings with media, schedules & more." />
          <Feature icon={<FaTicketAlt />} title="RSVP & Ticketing" desc="Manage reservations, send digital tickets, and track attendees." />
          <Feature icon={<FaUsers />} title="User Roles" desc="Dashboards tailored for Admins, Organizers, and Attendees." />
          <Feature icon={<FaBell />} title="Reminders" desc="Email & SMS reminders with integrated calendar views." />
          <Feature icon={<FaChartLine />} title="Analytics Dashboard" desc="Track engagement, attendance, and collect feedback." />
          <Feature icon={<FaCalendarAlt />} title="Live Updates" desc="Real-time updates via Socket.IO for seamless coordination." />
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
  <div className="bg-white dark:bg-gray-700 shadow p-6 rounded-2xl text-center">
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


// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="text-gray-800">
//       {/* Hero Section */}
//       <section className="bg-blue-600 text-white py-16 px-6 text-center">
//         <h1 className="text-4xl md:text-5xl font-bold mb-4">EventCraft</h1>
//         <p className="text-lg md:text-xl mb-6">
//           Seamless Planning. Flawless Execution.
//         </p>
//         <Link to="/register">
//           <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100">
//             Get Started
//           </button>
//         </Link>
//       </section>

//       {/* Role Highlights */}
//       <section className="bg-gray-100 py-10 px-6">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
//           <div className="p-6 border rounded-lg bg-white">
//             <h3 className="text-xl font-bold mb-2">For Organizers</h3>
//             <p>Plan, customize, and manage your events with real-time updates and analytics.</p>
//             <Link to="/dashboard/organizer">
//               <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Create Event
//               </button>
//             </Link>
//           </div>
//           <div className="p-6 border rounded-lg bg-white">
//             <h3 className="text-xl font-bold mb-2">For Attendees</h3>
//             <p>Browse events, reserve tickets, and get timely updates and reminders.</p>
//             <Link to="/dashboard/attendee">
//               <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                 Join Event
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-blue-600 text-white text-center py-4 mt-10">
//         <p>© {new Date().getFullYear()} EventCraft. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;


