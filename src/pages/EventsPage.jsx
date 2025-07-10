
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [customEvents, setCustomEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [userRole, setUserRole] = useState('');
  const [filters, setFilters] = useState({ name: '', city: '', date: '', time: '' });

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

  useEffect(() => {
    const fetchCustomEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        const transformed = res.data.map((e, index) => ({
          id: 1000 + index,
          name: e.title,
          date: `${e.date} ${e.time}`,
          location: e.location,
          price: parseFloat(e.price),
          image: `http://localhost:5000/uploads/${e.posterImage}`,
        }));
        setCustomEvents(transformed);
      } catch (error) {
        console.error('Error loading custom events:', error);
      }
    };

    fetchCustomEvents();
  }, []);

  const handleQuantityChange = (id, delta) => {
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const renderEventSection = (title, events) => (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-64 object-contain rounded-t-2xl bg-white dark:bg-gray-900"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-tight mt-1">{event.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.location}</p>
              <p className="mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-semibold">Price: ₹{event.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => handleQuantityChange(event.id, -1)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-1 rounded"
                >
                  −
                </button>
                <span className="text-md font-medium dark:text-white">{cart[event.id] || 0}</span>
                <button
                  onClick={() => handleQuantityChange(event.id, 1)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>

              <div className="mt-3 flex items-center justify-start gap-2">
                <button
                  onClick={() => navigate('/comedy')}
                  className="bg-violet-600 text-white text-sm px-3 py-1.5 rounded hover:bg-violet-700 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    if (userRole !== 'user') {
                      alert('🚫 Access Denied: You are logged in as an Organizer.');
                      return;
                    }

                    const quantity = cart[event.id] || 0;
                    if (quantity === 0) {
                      alert("Please select at least one ticket before proceeding.");
                      return;
                    }

                    navigate("/rsvp", {
                      state: {
                        event,
                        quantity,
                        total: quantity * event.price,
                      },
                    });
                  }}
                  className="text-sm px-3 py-1.5 rounded transition inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const filteredEvents = [...sampleEvents, ...customEvents].filter(event => {
    const { name, city, date, time } = filters;
    const nameMatch = name ? event.name.toLowerCase().includes(name.toLowerCase()) : true;
    const locationMatch = city ? event.location.toLowerCase().includes(city.toLowerCase()) : true;
    const dateMatch = date ? event.date.toLowerCase().includes(date.toLowerCase()) : true;
    const timeMatch = time ? event.date.toLowerCase().includes(time.toLowerCase()) : true;
    return nameMatch && locationMatch && dateMatch && timeMatch;
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-violet-500 via-white to-violet-200 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 h-screen sticky top-0 bg-gradient-to-br from-indigo-700 to-purple-700 text-white flex flex-col p-6 space-y-6 shadow-md">
        <h2 className="text-3xl font-extrabold tracking-wide">EventCraft</h2>
        <nav className="flex-1 overflow-y-auto flex flex-col space-y-3 text-sm">
          <SidebarButton to="/dashboardPage" label="Dashboard" navigate={navigate} role={userRole} />
          <SidebarButton to="/events" label="Explore Now" navigate={navigate} />
          <SidebarButton to="/home" label="Home" navigate={navigate} />
          <SidebarButton
            to="/create-event"
            label="Event Creation"
            navigate={navigate}
            disabled={userRole !== 'organizer'}
          />
          <SidebarButton to="/rsvp" label="RSVP & Ticketing" navigate={navigate} />
          <SidebarButton to="/roles" label="User Roles" navigate={navigate} />
          <SidebarButton to="/calendar-reminders" label="Reminders" navigate={navigate} />
          {/* <SidebarButton to="/analytics" label="Analytics Dashboard" navigate={navigate} /> */}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto">
        {/* Filter UI */}
        <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Filter Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Enter Event Name"
              value={filters.name || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
              className="px-4 py-2 rounded border dark:bg-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Enter City"
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              className="px-4 py-2 rounded border dark:bg-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Enter Date (e.g., 5 Jul)"
              value={filters.date}
              onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
              className="px-4 py-2 rounded border dark:bg-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Enter Time (e.g., 10 AM)"
              value={filters.time}
              onChange={(e) => setFilters(prev => ({ ...prev, time: e.target.value }))}
              className="px-4 py-2 rounded border dark:bg-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Events */}
        {renderEventSection('Laughter Therapy', filteredEvents)}
        {renderEventSection('Amusement Parks', amusementEvents)}
      </main>
    </div>
  );
};

const SidebarButton = ({ to, label, navigate, role }) => {
  const handleClick = () => {
    if (label === "Dashboard") {
      // 👇 Conditional redirection based on role
      if (role === "organizer") {
        navigate("/dashboardorg");
      } else {
        navigate("/dashboardPage");
      }
      return;
    }

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


// Static Events
const sampleEvents = [
  {
    id: 1,
    name: 'Kisi Ko Batana Mat Ft. Anubhav Singh Bassi',
    date: 'Sat, 5 Jul onwards',
    location: 'Kedarnath Sahni Auditorium: Delhi',
    price: 499,
    image: '/events/bassi.jpeg',
  },
  {
    id: 2,
    name: 'Banger Issues ft. Kaustubh Aggarwal',
    date: 'Sun, 6 Jul',
    location: 'The Laugh Store: DLF Cyberhub, Gurugram',
    price: 299,
    image: '/events/banger.avif',
  },
  {
    id: 3,
    name: 'Comedy Nights @Comedy County',
    date: 'Tue, 1 Jul onwards',
    location: 'Comedy County: Noida',
    price: 199,
    image: '/events/comedy.avif',
  },
  {
    id: 4,
    name: 'Daily Ka Kaam Hai By Aakash Gupta',
    date: 'Fri, 18 Jul onwards',
    location: 'The Laugh Store: DLF Cyberhub, Gurugram',
    price: 349,
    image: '/events/daily.avif',
  },
  {
    id: 5,
    name: 'Dating Game Show',
    date: 'Wed, 9 Jul onwards',
    location: 'The Laugh Store: DLF Cyberhub, Gurugram',
    price: 279,
    image: '/events/dating.avif',
  },
  {
    id: 6,
    name: 'Adult Jokes Only',
    date: 'Thu, 3 Jul onwards',
    location: 'TOT Studios',
    price: 299,
    image: '/events/adult.avif',
  },
];

const amusementEvents = [
  {
    id: 7,
    name: 'Adventure Island Delhi',
    date: 'Daily, 10 AM - 7 PM',
    location: 'Rohini, Delhi',
    price: 700,
    image: '/events/adventure.jpeg',
  },
  {
    id: 8,
    name: 'Worlds of Wonder',
    date: 'Weekends Only',
    location: 'Sector 38A, Noida',
    price: 999,
    image: '/events/wow.jpeg',
  },
  {
    id: 9,
    name: 'Snow Masti',
    date: 'Fri - Sun, 11 AM - 6 PM',
    location: 'Khopoli, Maharashtra',
    price: 1299,
    image: '/events/snow.avif',
  },
  {
    id: 10,
    name: 'TimeZone',
    date: 'Fri - Sun, 11 AM - 6 PM',
    location: 'Magneto Mall',
    price: 1299,
    image: '/events/TimeZone.jpeg',
  },
];

export default EventsPage;

