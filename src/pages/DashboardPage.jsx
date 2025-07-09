import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';


const DashboardPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [clearedBookings, setClearedBookings] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    contact: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        contact: user.contact || '',
      });
    }
  }, []);

  const handleRemove = (indexToRemove) => {
    if (window.confirm("Are you sure you want to remove this booking?")) {
      const updated = bookings.filter((_, index) => index !== indexToRemove);
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
      alert("Event booking cancelled successfully and payment will revert back in 2 days.");
    }
  };

  const handleClearAll = () => {
    if (window.confirm("This will remove all bookings. Proceed?")) {
      setClearedBookings(bookings);
      setBookings([]);
      localStorage.removeItem("bookings");

      const timeout = setTimeout(() => {
        setClearedBookings(null);
      }, 10000);
      setUndoTimeout(timeout);
    }
  };

  const handleUndoClear = () => {
    if (clearedBookings) {
      setBookings(clearedBookings);
      localStorage.setItem("bookings", JSON.stringify(clearedBookings));
      setClearedBookings(null);
      if (undoTimeout) clearTimeout(undoTimeout);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <aside className="w-64 bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col p-6 space-y-6 shadow-md">
        <h2 className="text-3xl font-extrabold tracking-wide">EventCraft</h2>
        <nav className="flex flex-col space-y-4 text-sm">
          <SidebarButton to="/dashboardPage" label="Dashboard" navigate={navigate} />
          <SidebarButton to="/events" label="Explore Now" navigate={navigate} />
          <SidebarButton to="/home" label="Home" navigate={navigate} />
          <SidebarButton to="/create-event" label="Event Creation" navigate={navigate} />
          <SidebarButton to="/rsvp" label="RSVP & Ticketing" navigate={navigate} checkBooking bookings={bookings} />
          <SidebarButton to="/roles" label="User Roles" navigate={navigate} />
          <SidebarButton to="/calendar-reminders" label="Reminders" navigate={navigate} />
          <SidebarButton to="/analytics" label="Analytics Dashboard" navigate={navigate} />
        </nav>
      </aside>

      <main className="flex-1 p-8 relative">
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

        <h1 className="text-4xl font-bold mb-8 text-indigo-700 dark:text-indigo-400">Dashboard</h1>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">🎟️ Booked Shows</h2>
            {bookings.length > 0 && (
              <button
                onClick={handleClearAll}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium transition"
              >
                Clear All Bookings
              </button>
            )}
          </div>

          {clearedBookings && (
            <div className="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded flex justify-between items-center">
              <span>All bookings cleared.</span>
              <button
                onClick={handleUndoClear}
                className="ml-4 underline text-blue-700 hover:text-blue-900 font-semibold"
              >
                Undo
              </button>
            </div>
          )}

          {bookings.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No bookings yet. Go book an event!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 shadow rounded-2xl overflow-hidden hover:shadow-lg transition">
                  <img src={booking.image} alt={booking.name} className="w-full h-[500px] object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1">{booking.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">{booking.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{booking.location}</p>
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                      🎫 {booking.quantity} × ₹{booking.price} = ₹{booking.total}
                    </p>
                    <button
                      onClick={() => handleRemove(index)}
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                    >
                      Remove
                    </button>
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

// ✅ SidebarButton with role check for "Event Creation"
const SidebarButton = ({ to, label, navigate, checkBooking, bookings }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    // Only organizer can access Event Creation
    if (label === "Event Creation" && user?.role !== "organizer") {
      alert("Only organizers can access Event Creation.");
      return;
    }

    // Booking check for RSVP & Ticketing
    if (checkBooking && (!bookings || bookings.length === 0)) {
      alert("Please book an event first.");
      navigate("/events");
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
