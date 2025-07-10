import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// SidebarButton component (reused from DashboardPage)
const SidebarButton = ({ to, label, navigate, checkBooking, bookings }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    if (label === "Event Creation" && user?.role !== "organizer") {
      alert("Only organizers can access Event Creation.");
      return;
    }

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

const RSVPPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, quantity, total } = location.state || {};
  const [bookings, setBookings] = useState([]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!event || !quantity || !total) {
      navigate("/events");
    }

    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, [event, quantity, total, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setUserInfo((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleProceedToPayment = () => {
    const { name, email, phone } = userInfo;
    if (!name || !email || !phone) {
      alert("Please fill in all your details before proceeding.");
      return;
    }

    navigate("/payment", {
      state: {
        event,
        quantity,
        total,
        user: userInfo,
      },
    });
  };

  if (!event) return null;

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
          <SidebarButton to="/rsvp" label="RSVP & Ticketing" navigate={navigate} checkBooking bookings={bookings} />
          <SidebarButton to="/roles" label="User Roles" navigate={navigate} />
          <SidebarButton to="/calendar-reminders" label="Reminders" navigate={navigate} />
          {/* <SidebarButton to="/analytics" label="Analytics Dashboard" navigate={navigate} /> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-lg w-full">
          <h1 className="text-2xl font-bold mb-4">Confirm Your RSVP</h1>

          <div className="space-y-2 text-sm">
            <p><strong>Event:</strong> {event.name || event.title}</p>
            <p><strong>Date & Time:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Tickets:</strong> {quantity}</p>
            <p><strong>Price per Ticket:</strong> ₹{event.price}</p>
            <p><strong>Total:</strong> ₹{total}</p>
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={userInfo.phone}
              onChange={handlePhoneChange}
              maxLength={10}
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
            />
          </div>

          <button
            onClick={handleProceedToPayment}
            className="mt-6 w-full bg-violet-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-violet-700 transition"
          >
            Pay Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default RSVPPage;
