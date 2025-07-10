
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import html2canvas from "html2canvas";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDone, setPaymentDone] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [cvv, setCvv] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardName, setCardName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [expiryError, setExpiryError] = useState("");

  const { state } = useLocation();
  const navigate = useNavigate();
  const { event = {}, quantity = 1, total = 0, user = {} } = state || {};

  const {
    name: userName = "John Doe",
    email = "unknown@example.com",
    phone = "0000000000",
  } = user;

  const eventName = event.name || "Unknown Event";
  const ticketPrice = event.price || 0;
  const tickets = quantity;
  const totalPrice = total || ticketPrice * tickets;
  const showTime = event.date || "TBD";

  const ticketRef = useRef();

  const downloadTicketAsImage = async () => {
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${eventName.replace(/\s+/g, "_")}_Ticket.png`;
    link.click();
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const isFormValid = () => {
    if (paymentMethod === "card") {
      const cleanedCard = cardNumber.replace(/\s/g, "");
      return (
        cleanedCard.length === 16 &&
        cardName.trim() !== "" &&
        expiry.match(/^\d{2}\/\d{2}$/) &&
        cvv.length === 3 &&
        !expiryError
      );
    } else {
      return (
        bankName && bankName !== "Select your Bank" &&
        accountHolder.trim() !== ""
      );
    }
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length >= 3) {
      val = val.slice(0, 4);
      const month = val.slice(0, 2);
      const year = val.slice(2);
      const formatted = `${month}/${year}`;
      setExpiry(formatted);

      const enteredMonth = parseInt(month, 10);
      const enteredYear = parseInt(year, 10);
      const current = new Date();
      const currentMonth = current.getMonth() + 1;
      const currentYear = current.getFullYear() % 100;

      if (
        enteredMonth < 1 || enteredMonth > 12 ||
        enteredYear < currentYear ||
        (enteredYear === currentYear && enteredMonth < currentMonth)
      ) {
        setExpiryError("Card expired or invalid");
      } else {
        setExpiryError("");
      }
    } else {
      setExpiry(val);
      setExpiryError("");
    }
  };

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative">
        <Link to="/dashboardPage" title="Go to Dashboard" className="absolute top-6 right-6 text-2xl text-purple-600 hover:text-purple-800 transition">
          <FaTachometerAlt />
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 mb-4 bg-purple-100 text-purple-700 flex items-center justify-center rounded-full text-3xl font-bold"
          >
            ✔
          </motion.div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Transaction Successful</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Your payment has been processed securely via Razorpay.</p>

          <div className="flex flex-col gap-4 items-center justify-center">
            <button
              onClick={downloadTicketAsImage}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded font-medium transition"
            >
              Download Ticket
            </button>

            <button
              onClick={() => {
                try {
                  // Convert event.date to Date object safely
                  const start = new Date(event.date);
                  if (isNaN(start.getTime())) {
                    alert("Invalid event date/time.");
                    return;
                  }

                  // End time = start + 2 hours (adjustable)
                  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

                  // Format as YYYYMMDDTHHMMSSZ
                  const formatDate = (d) =>
                    d.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");

                  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    eventName
                  )}&dates=${formatDate(start)}/${formatDate(end)}&details=${encodeURIComponent(
                    `Join us for ${eventName} organized by Event Craft!`
                  )}&location=${encodeURIComponent(event.location || "TBD")}&sf=true&output=xml`;

                  window.open(calendarUrl, "_blank");
                } catch (err) {
                  console.error("Calendar error:", err);
                  alert("Something went wrong while adding to calendar.");
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium transition"
            >
              Add to Calendar
            </button>


          </div>

          <div
            ref={ticketRef}
            className="p-6 w-[400px] rounded-lg shadow-lg mt-6"
            style={{ backgroundColor: "#0b1222", color: "white" }}
          >
            <img
              src={event.image || "https://placehold.co/400x200?text=Event+Poster"}
              alt="Event Poster"
              className="w-full h-70 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold mb-2">🎟 Event Ticket</h2>
            <p><strong>Event:</strong> {eventName}</p>
            <p><strong>Date:</strong> {showTime}</p>
            <p><strong>Location:</strong> {event.location || "TBD"}</p>
            <p><strong>Price:</strong> ₹{ticketPrice}</p>
            <p><strong>Tickets:</strong> {tickets}</p>
            <p><strong>Total:</strong> ₹{totalPrice}</p>
            <hr className="my-2" />
            <p><strong>Name:</strong> {userName}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p className="mt-4 text-center">Thanks for booking with <strong>Event Craft</strong>!</p>
          </div>
        </motion.div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Left Section */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Payment Request from Event Craft</h2>
          <div className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
            <p><strong>Event Name:</strong> {eventName}</p>
            <p><strong>Show Time:</strong> {showTime}</p>
            <p><strong>Ticket Price:</strong> ₹ {ticketPrice}.00</p>
            <p><strong>Tickets:</strong> {tickets}</p>
            <p><strong>Total Price:</strong> ₹ {totalPrice}.00</p>
          </div>

          <div className="mt-6">
            {paymentMethod === "card" ? (
              <div className="space-y-3">
                <p className="text-md font-semibold text-purple-700">Card Details</p>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    if (raw.length <= 16) {
                      const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                      setCardNumber(formatted);
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                  inputMode="numeric"
                  maxLength={19}
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
                />
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={handleExpiryChange}
                      className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
                      inputMode="numeric"
                      maxLength={5}
                    />
                    {expiryError && <p className="text-red-500 text-sm mt-1">{expiryError}</p>}
                  </div>
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      if (val.length <= 3) setCvv(val);
                    }}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
                    inputMode="numeric"
                    maxLength={3}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-md font-semibold text-purple-700">Netbanking Details</p>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
                >
                  <option>Select your Bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
                <input
                  type="text"
                  placeholder="Account Holder Name"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  className="w-full border rounded p-2 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Powered by <span className="text-purple-600 font-semibold">Razorpay</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 bg-purple-50 dark:bg-purple-900 p-6 border-l border-purple-200 dark:border-purple-700 flex flex-col justify-between">
          <div>
            <img
              src={event.image || "https://placehold.co/400x200?text=Event+Poster"}
              alt={eventName}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-white">Event Craft</h3>
            <p className="text-2xl font-bold text-purple-900 dark:text-white mt-1">
              Total to pay: ₹ {totalPrice}
            </p>
            <div className="mt-6 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Name:</strong> {userName}</p>
              <p><strong>Phone:</strong> {phone}</p>
              <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="mt-6">
              <p className="mb-2 font-medium text-gray-700 dark:text-white">Select a Payment Method</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded font-medium transition ${paymentMethod === "card"
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 dark:bg-gray-700 dark:text-white"
                    }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-3 rounded font-medium transition ${paymentMethod === "netbanking"
                    ? "bg-purple-600 text-white"
                    : "bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 dark:bg-gray-700 dark:text-white"
                    }`}
                >
                  Netbanking
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              disabled={!isFormValid()}
              onClick={() => {
                const newBooking = {
                  name: eventName,
                  date: showTime,
                  location: event.location || "TBD",
                  quantity: tickets,
                  price: ticketPrice,
                  total: totalPrice,
                  image: event.image || "https://placehold.co/400x200?text=Event+Image",
                };
                const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
                localStorage.setItem("bookings", JSON.stringify([...existingBookings, newBooking]));
                setPaymentDone(true);
              }}
              className={`w-full py-3 rounded font-semibold transition ${isFormValid()
                ? "bg-purple-600 text-white hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed text-white"
                }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// export default Payment;
