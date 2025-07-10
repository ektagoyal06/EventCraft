
import React, { useState, useEffect } from 'react';
import { FiEdit2, FiSun, FiMoon } from 'react-icons/fi';

const UserProfile = () => {
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 font-sans">
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

      {/* Profile Container */}
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
          {/* Profile Picture and Name */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://i.pravatar.cc/150?img=3"
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-indigo-500"
            />
            <h1 className="text-2xl font-bold">Jane Doe</h1>
            <p className="text-gray-500 dark:text-gray-400">Event Organizer</p>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <InfoItem label="Email" value="jane.doe@example.com" />
            <InfoItem label="Phone" value="+1 234 567 8901" />
            <InfoItem label="Location" value="New York, USA" />
            <InfoItem label="Member Since" value="March 2021" />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-lg">
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
    <button className="text-indigo-600 hover:text-indigo-400 transition">
      <FiEdit2 />
    </button>
  </div>
);
export default UserProfile;
