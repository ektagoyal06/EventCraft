import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    contact: '',
    _id: '',
  });
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails(user);

      fetch(`http://localhost:5000/api/events/organizer/${user._id}`)
        .then((res) => res.json())
        .then((data) => setCreatedEvents(data.events || []))
        .catch((err) => console.error('Error fetching events:', err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen font-sans text-gray-800 dark:text-gray-200 dark:bg-gray-900">
      {/* Sidebar - Same style as in EventForm */}
      <aside className="w-64 bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col p-6 space-y-6 shadow-md">
        <h2 className="text-3xl font-extrabold tracking-wide">EventCraft</h2>
        <nav className="flex flex-col space-y-4 text-sm">
          <SidebarButton to="/dashboardorg" label="Dashboard" navigate={navigate} />
          <SidebarButton to="/events" label="Explore Now" navigate={navigate} />
          <SidebarButton to="/home" label="Home" navigate={navigate} />
          <SidebarButton to="/create-event" label="Event Creation" navigate={navigate} />
          <SidebarButton to="/rsvp" label="RSVP & Ticketing" navigate={navigate} />
          <SidebarButton to="/roles" label="User Roles" navigate={navigate} />
          <SidebarButton to="/calendar-reminders" label="Reminders" navigate={navigate} />
          {/* <SidebarButton to="/analytics" label="Analytics Dashboard" navigate={navigate} /> */}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 relative">
        {/* Profile icon */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-3xl text-indigo-600 dark:text-indigo-300"
            >
              <FaUserCircle />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-4">
                <h3 className="text-lg font-semibold mb-2">👤 Profile</h3>
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Contact:</strong> {userDetails.contact}</p>
                <p><strong>Role:</strong> {userDetails.role}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-indigo-700 dark:text-indigo-400">
          Organizer Dashboard
        </h1>

        {/* Events Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">📋 Your Created Events</h2>
            <button
              onClick={() => navigate('/create-event')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            >
              + Create Event
            </button>
          </div>

          {createdEvents.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No events created yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000/uploads/${event.posterImage}`}
                    alt={event.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{event.date} @ {event.time}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{event.location}</p>
                    <p className="mt-2 text-indigo-600 dark:text-indigo-300 font-semibold">₹{event.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const SidebarButton = ({ to, label, navigate }) => (
  <button
    onClick={() => navigate(to)}
    className="text-left bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition font-medium"
  >
    {label}
  </button>
);

export default OrganizerDashboard;
