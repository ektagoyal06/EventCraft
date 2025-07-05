import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    setRole(savedRole);

    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    period: 'AM', // added
    price: '',
    description: '',
    location: '',
  });

  const [poster, setPoster] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPoster(file);
    } else {
      alert('Only image files are allowed!');
      e.target.value = null;
      setPoster(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'time') {
        data.append('time', `${formData.time} ${formData.period}`); // combine time and period
      } else if (key !== 'period') {
        data.append(key, value);
      }
    });

    if (poster) {
      data.append('poster', poster);
    }

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setShowAlert(true);
        setFormData({
          title: '',
          date: '',
          time: '',
          period: 'AM',
          price: '',
          description: '',
          location: '',
        });
        setPoster(null);

        setTimeout(() => setShowAlert(false), 3000);
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  if (role === 'User') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">🚫 Access Denied</h2>
          <p>You are not eligible to create an event.</p>
          <button
            onClick={() => navigate('/dashboardPage')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500"
          >
            Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans text-gray-800 dark:text-gray-200 dark:bg-gray-900">
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

      <main className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-4xl font-bold mb-6 text-center">Create an Event</h2>

          {showAlert && (
            <div className="mb-6 text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-800 border border-green-300 dark:border-green-600 px-4 py-3 rounded-lg transition">
              <div className="flex justify-between items-center">
                <span>✅ Event added successfully!</span>
                <button
                  onClick={() => navigate('/events')}
                  className="ml-4 underline font-semibold text-blue-700 dark:text-blue-300 hover:text-blue-900"
                >
                  View
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <FormField
              label="Event Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
            <FormField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            {/* Time and AM/PM */}
            <div className="flex space-x-4 items-center">
              <div className="flex-1">
                <label className="block mb-2 text-lg font-medium">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mt-8">
                <select
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <FormField
              label="Price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              placeholder="Event price"
              required
            />
            <FormField
              label="Location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event location"
              required
            />

            <div>
              <label className="block mb-2 text-lg font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Event description"
              ></textarea>
            </div>

            <div>
              <label className="block mb-2 text-lg font-medium">Poster Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-xl"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow transition"
            >
              Create Event
            </button>
          </form>
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

const FormField = ({ label, name, type, value, onChange, placeholder, required }) => (
  <div>
    <label className="block mb-2 text-lg font-medium">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      placeholder={placeholder}
    />
  </div>
);

export default EventForm;
