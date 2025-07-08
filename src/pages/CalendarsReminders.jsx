import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const CalendarReminders = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userDetails, setUserDetails] = useState({ role: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails({ role: user.role || '' });
    }
  }, []);

  const reminders = [
    { time: '09:00 AM', text: 'tech workshop' },
    { time: '03:00 PM', text: 'spiritual event' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col p-6 space-y-6 shadow-md">
        <h2 className="text-3xl font-extrabold tracking-wide">EventCraft</h2>
        <nav className="flex flex-col space-y-4 text-sm">
          <SidebarButton to="/dashboardPage" label="Dashboard" navigate={navigate} />
          <SidebarButton to="/events" label="Explore Now" navigate={navigate} />
          <SidebarButton to="/home" label="Home" navigate={navigate} />
          <SidebarButton to="/create-event" label="Event Creation" navigate={navigate} role={userDetails.role} />
          <SidebarButton to="/rsvp" label="RSVP & Ticketing" navigate={navigate} />
          <SidebarButton to="/roles" label="User Roles" navigate={navigate} />
          <SidebarButton to="/calendar-reminders" label="Reminders" navigate={navigate} />
          <SidebarButton to="/analytics" label="Analytics Dashboard" navigate={navigate} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
          Calendar & Reminders
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Calendar View */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Event Calendar</h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="w-full border-none"
            />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Selected Date: {selectedDate.toDateString()}
            </p>
          </div>

          {/* Reminders Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reminders</h2>
            <ul className="space-y-4">
              {reminders.map((reminder, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl"
                >
                  <FaBell className="text-indigo-600 mt-1" />
                  <div>
                    <p className="font-medium">{reminder.time}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{reminder.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => alert('Reminder sent!')}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl transition"
            >
              Send Email/SMS Reminder
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// ✅ SidebarButton Component with role check for "Event Creation"
const SidebarButton = ({ to, label, navigate, role }) => {
  const handleClick = () => {
    // Restrict "Event Creation" if not organizer
    if (label === "Event Creation" && role !== "organizer") {
      alert("Only organizers can access Event Creation.");
      return;
    }

    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="text-left bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition font-medium"
    >
      {label}
    </button>
  );
};

export default CalendarReminders;
