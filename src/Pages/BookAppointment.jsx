import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, User, Phone, Mail, Scissors, Loader2 } from "lucide-react";
import apiClient from "../../src/api/axios.js"; // Update the path to your apiClient

const services = [
  "Bridal Hair Styling",
  "Hair Coloring",
  "Hair Extensions",
  "Cuts & Styling",
  "Treatments",
];

export default function BookAppointment() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: services[0],
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setSubmitted(false);

    try {
      // Adjust the API endpoint as needed for your backend
      const response = await apiClient.post("/appointments/book", form);
      setSuccess("Your appointment has been booked successfully! We'll contact you for confirmation.");
      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        service: services[0],
        date: "",
        time: "",
        notes: "",
      });
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "There was a problem booking your appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-neutral-950 py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-3">
            <CalendarCheck className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              Book an Appointment
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
              Reserve Your Session With Precious Hairmpire
            </span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto">
            Fill out the form below to book your appointment. Our team will confirm your booking and get you ready for a stunning transformation!
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-neutral-900 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 p-8 flex flex-col gap-5"
            autoComplete="off"
          >
            <div className="flex items-center gap-2 mb-2">
              <Scissors className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold text-yellow-200">Your Details</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-yellow-200 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-yellow-200 mb-1">Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {services.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className="py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className="py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-yellow-200 mb-1">Notes (optional)</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Tell us anything special (e.g., hair type, inspiration, allergies)..."
                  rows={3}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-red-900 transition flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Booking...
                </>
              ) : (
                <>
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  Book Appointment
                </>
              )}
            </button>
            {success && (
              <div className="mt-4 text-green-400 font-semibold text-center" aria-live="polite">
                {success}
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-400 font-semibold text-center" aria-live="polite">
                {error}
              </div>
            )}
          </form>

          {/* Sidebar Summary */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-yellow-500/90 to-red-800/90 px-8 w-80">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Why Book With Us?</h2>
            <ul className="text-yellow-50 space-y-3 text-lg">
              <li>✨ Award-winning stylists</li>
              <li>💍 Bridal & event specialists</li>
              <li>🎨 Custom color & extensions</li>
              <li>🕒 Flexible scheduling</li>
              <li>💎 Luxury experience</li>
            </ul>
            <div className="mt-8 text-center text-yellow-100 text-sm">
              <div>Need help?</div>
              <a href="tel:+2348012345678" className="underline hover:text-white">
                +234 806 151 4604
              </a>
              <br />
              <a href="mailto:info@glamsalon.com" className="underline hover:text-white">
                info@precioushairmpire.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
