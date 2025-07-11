
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import ChatBot from "../pages/ChatBot"; // adjust path as needed

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

  const eventImages = [
    `${import.meta.env.BASE_URL}events/bassi.jpeg`,
    `${import.meta.env.BASE_URL}events/adult.avif`,
    `${import.meta.env.BASE_URL}events/comedy.avif`,
    `${import.meta.env.BASE_URL}events/dating.avif`,
    `${import.meta.env.BASE_URL}events/banger.avif`,
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white relative">
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
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 mt-20 relative">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Your All-in-One{" "}
            <span className="text-violet-600 dark:text-violet-400">
              Event Management
            </span>{" "}
            Platform
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
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center z-10">
          <img
            src={`${import.meta.env.BASE_URL}events/background.png`}
            alt="Event Illustration"
            className="w-full max-w-md rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* Scrollable Event Images */}
      <div className="px-8 mt-1">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
          Featured Events
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {eventImages.map((src, index) => (
            <Link to={`/signup`} key={index}>
              <img
                src={src}
                alt={`Event ${index + 1}`}
                className="h-80 w-72 object-cover rounded-xl shadow-md flex-shrink-0 hover:opacity-90 transition duration-200"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6 text-center mt-20">
        <p className="mb-2">&copy; {new Date().getFullYear()} EventCraft. All rights reserved.</p>
        <div className="flex justify-center gap-6 text-sm mt-4">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Use</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>

      {/* ✅ Chatbot in bottom-right corner */}
      <div className="fixed bottom-4 right-4 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default LandingPage;

