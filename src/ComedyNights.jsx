import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ComedyNights = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
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

      {/* Header */}
      <header className="bg-gradient-to-br from-purple-700 to-indigo-600 text-white py-10 px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Kisi Ko Batana Mat Ft. Anubhav Singh Bassi</h1>
        <p className="text-sm max-w-2xl mx-auto">
          Get ready to laugh your heart out with the funniest stand-up acts in town. Join us for a night of non-stop entertainment, hilarious punchlines, and unforgettable comedy performances.
        </p>
      </header>

      {/* Main Content */}
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Stand-Up Special at Kisi Ko Batana Mat Ft. Anubhav Singh Bassi – Delhi
        </h2>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6 space-y-1">
          <p className="text-sm">📅 Sat, 5 Jul onwards</p>
          <p className="text-sm mt-2">📍 Kedarnath Sahni Auditorium: Delhi</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Kedarnath Sahni Auditorium • 5 km away</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">About the event</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Comedy Nights brings together India’s top stand-up comedians for a night of live laughter. Whether you're a seasoned comedy fan or just looking for a fun night out, this event promises good vibes, great energy, and tons of laughs!
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-300 dark:border-gray-700 pt-4">
          <p className="text-2xl font-bold">₹499</p>
          <button
            onClick={() => {
              const user = JSON.parse(localStorage.getItem('user'));
              if (!user || user.role !== 'user') {
                alert('🚫 Access Denied: You are logged in as an Organizer.');
                return;
              }
              navigate('/rsvp', {
                state: {
                  event: {
                    id: 'comedy-night-001',
                    name: 'Kisi Ko Batana Mat Ft. Anubhav Singh Bassi',
                    location: 'Kedarnath Sahni Auditorium, Delhi',
                    price: 499,
                  },
                  quantity: 1,
                  total: 499,
                }
              });
            }}
            className="bg-violet-600 text-white text-sm px-3 py-1.5 rounded hover:bg-violet-700 transition inline-flex items-center"
          >
            Buy tickets
          </button>


        </div>
      </main>


    </div>
  );
};

export default ComedyNights;
