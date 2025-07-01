import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Calendar styles
import { FaBell } from 'react-icons/fa';

const CalendarReminders = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const reminders = [
    { time: '09:00 AM', text: 'tech workshop' },
    // { time: '12:00 PM', text: 'Lunch break announcement' },
    { time: '03:00 PM', text: 'spiritual event' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
        Calendar & Reminders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Calendar View */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Event Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full border-none"
          />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Selected Date: {selectedDate.toDateString()}
          </p>
        </div>

        {/* Reminders Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Reminders</h2>
          <ul className="space-y-4">
            {reminders.map((reminder, idx) => (
              <li
                key={idx}
                className="flex items-start space-x-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl"
              >
                <FaBell className="text-indigo-600 mt-1" />
                <div>
                  <p className="font-medium">{reminder.time}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{reminder.text}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Placeholder for Email/SMS */}
          <button
            onClick={() => alert('Reminder sent!')}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl transition"
          >
            Send Email/SMS Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarReminders;
