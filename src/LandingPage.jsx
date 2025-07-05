import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

const LandingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 shadow-md dark:shadow-gray-800">
        <div className="text-2xl font-bold text-violet-700 dark:text-violet-400">EventCraft</div>
        <div className="flex items-center gap-4">
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-2xl ml-2 text-gray-600 dark:text-yellow-400"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 mt-20">

        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Your All-in-One <span className="text-violet-600 dark:text-violet-400">Event Management</span> Platform
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Create, manage, and explore events with ease. Whether you're an organizer or an enthusiast, EventCraft offers seamless experiences to bring people together.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-md transition"
          >
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src="https://cdn.dribbble.com/users/213234/screenshots/5594710/media/ef2f1a21706c312e703ccf2c03f63175.gif"
            alt="Event Illustration"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
