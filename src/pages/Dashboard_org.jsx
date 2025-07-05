import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    contact: '',
  });
  const [createdEvents, setCreatedEvents] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        contact: user.contact || '',
      });

      // ✅ Fetch only events created by this organizer
      fetch(`http://localhost:5500/api/events/organizer/${user._id}`)
        .then((res) => res.json())
        .then((data) => {
          setCreatedEvents(data.events || []);
        })
        .catch((err) => {
          console.error('Error fetching organizer events:', err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col p-6 space-y-6 shadow-md">
        <h2 className="text-3xl font-extrabold tracking-wide">EventCraft</h2>
        <nav className="flex flex-col space-y-4 text-sm">
          <SidebarButton to="/dashboardPage" label="Dashboard" navigate={navigate} />
          <SidebarButton to="/events" label="Explore Now" navigate={navigate} />
          <SidebarButton to="/home" label="Home" navigate={navigate} />
          <SidebarButton to="/create-event" label="Event Creation" navigate={navigate} />
          <SidebarButton to="/rsvp" label="RSVP & Ticketing" navigate={navigate} />
          <SidebarButton to="/roles" label="User Roles" navigate={navigate} />
          <SidebarButton to="/calendar-reminders" label="Reminders" navigate={navigate} />
          <SidebarButton to="/analytics" label="Analytics Dashboard" navigate={navigate} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        {/* Profile dropdown */}
        <div className="flex justify-end items-center mb-6">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-3xl text-indigo-700 dark:text-indigo-300 focus:outline-none"
            >
              <FaUserCircle />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">👤 Profile Info</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Name:</strong> {userDetails.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Email:</strong> {userDetails.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Contact:</strong> {userDetails.contact}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Role:</strong> {userDetails.role}</p>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Organizer Dashboard */}
        <h1 className="text-4xl font-bold mb-8 text-indigo-700 dark:text-indigo-400">Organizer Dashboard</h1>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">📋 Your Created Events</h2>
            <button
              onClick={() => navigate('/create-event')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-medium transition"
            >
              + Create New Event
            </button>
          </div>

          {createdEvents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">You haven't created any events yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-700 shadow rounded-2xl overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={`http://localhost:5500/uploads/${event.posterImage}`}
                    alt={event.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">{event.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{event.location}</p>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                      🎫 ₹{event.price}
                    </p>
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

// ✅ Sidebar button component with Event Creation protection
const SidebarButton = ({ to, label, navigate }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    if (label === 'Event Creation' && user?.role.toLowerCase() !== 'organizer') {
      alert('Only organizers can access Event Creation.');
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

export default DashboardPage;
