import React, { useState } from 'react';

const RSVPPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Replace with API call to register RSVP
    console.log({ name, email, tickets });

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">RSVP for TechCon 2025</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Join us for an exciting day filled with tech talks, networking, and innovation! Reserve your spot now.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Number of Tickets</label>
              <input
                type="number"
                min="1"
                max="10"
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                className="mt-1 block w-24 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              Confirm RSVP
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 dark:text-green-400 mt-6">
            <h3 className="text-2xl font-semibold mb-2">🎉 You're all set, {name}!</h3>
            <p>A confirmation has been sent to <strong>{email}</strong>.</p>
            <p className="mt-2">🎟️ {tickets} ticket(s) reserved for TechCon 2025.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RSVPPage;
