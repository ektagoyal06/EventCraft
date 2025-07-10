
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiEye, FiEyeOff } from "react-icons/fi";

const SignupForm = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [role, setRole] = useState("User");
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact" && !/^\d{0,10}$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contact.length !== 10 && !isSignIn) {
      alert("📞 Contact number must be exactly 10 digits.");
      return;
    }

    try {
      let endpoint = "";
      let payload = {};
      if (isSignIn) {
        endpoint = "http://localhost:5000/api/login";  // Correct route
        payload = {
          email: formData.email,
          password: formData.password,
        };
      }

      else {
        // 📝 Sign Up logic
        endpoint =
          role === "Organizer"
            ? "http://localhost:5000/api/signup/organizer"
            : "http://localhost:5000/api/signup";

        payload =
          role === "Organizer"
            ? {
              name: formData.name,
              email: formData.email,
              contact: formData.contact,
              password: formData.password,
            }
            : {
              ...formData,
              role,
            };
      }

      const res = await axios.post(endpoint, payload);

      const userData = isSignIn
        ? res.data.user || res.data
        : {
          _id: res.data.user?._id, // ✅ Add this
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          role: role.toLowerCase(),
        };


      localStorage.setItem("user", JSON.stringify(userData));
      alert(res.data.message || (isSignIn ? "✅ Signin successful!" : "✅ Signup successful!"));
      setFormData({ name: "", email: "", password: "", contact: "" });
      navigate("/home");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        (isSignIn ? "❌ Signin failed." : "❌ Signup failed.")
      );
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-white to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-12 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50 flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl text-yellow-500 hover:text-yellow-400 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      <div
        className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden transition-all duration-700 ${isSignIn ? "flex-row-reverse" : ""
          }`}
      >
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-violet-800 via-purple-600 to-indigo-700 text-white flex flex-col justify-center items-center px-8 py-16 space-y-6">
          {!isSignIn ? (
            <>
              <h1 className="text-5xl font-bold font-sans tracking-wide text-center drop-shadow-md">
                Welcome Back!
              </h1>
              <p className="text-base font-medium text-center max-w-xs leading-relaxed">
                Already have an account? <br /> Sign in to explore exciting events and manage your bookings.
              </p>
              <button
                onClick={() => setIsSignIn(true)}
                className="bg-white text-violet-700 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-violet-100 transition duration-300"
              >
                SIGN IN
              </button>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold font-sans tracking-wide text-center drop-shadow-md">
                Welcome to EventCraft
              </h1>
              <p className="text-base font-medium text-center max-w-xs leading-relaxed">
                New here? <br /> Create an account to discover amazing events.
              </p>
              <button
                onClick={() => setIsSignIn(false)}
                className="bg-white text-violet-700 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-violet-100 transition duration-300"
              >
                SIGN UP
              </button>
            </>
          )}
        </div>

        {/* Right Panel: Form */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-bold text-center text-violet-700 dark:text-white mb-6">
            {isSignIn ? "Welcome Back!" : "Create Account"}
          </h2>

          {/* Role Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setRole("User")}
              className={`px-4 py-2 rounded-l-full font-semibold text-sm ${role === "User"
                ? "bg-violet-700 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
            >
              User
            </button>
            <button
              onClick={() => setRole("Organizer")}
              className={`px-4 py-2 rounded-r-full font-semibold text-sm ${role === "Organizer"
                ? "bg-violet-700 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
            >
              Organizer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder={role === "User" ? "Full Name" : "Organizer Name"}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
              required
              maxLength={10}
              pattern="\d{10}"
              title="Enter a valid 10-digit phone number"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300 cursor-pointer text-xl"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl transition duration-200"
            >
              {isSignIn ? `Sign In as ${role}` : `Sign Up as ${role}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupForm;

