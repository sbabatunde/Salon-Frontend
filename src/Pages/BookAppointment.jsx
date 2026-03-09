import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarCheck, User, Phone, Mail, Scissors, Loader2, Sparkles, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../src/api/axios.js";

export default function BookAppointment() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    
    const params = new URLSearchParams(location.search);
    const selectedStyle = params.get("style");

    // Get Services 
    useEffect(() => {
        const fetchServicesOffered = async () => {
            try {
                const response = await apiClient.get("/services/list");
                const data = response.data?.data || [];
                setServices(data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch services.");
            }
        };

        fetchServicesOffered();
    }, []);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        notes: selectedStyle ? `I want to book the style - ${selectedStyle}` : "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await apiClient.post("/appointments/book", form);
            setSuccess("Your appointment has been booked successfully! We'll contact you for confirmation.");
            setSubmitted(true);
            setForm({
                name: "",
                phone: "",
                email: "",
                service: "",
                date: "",
                time: "",
                notes: "",
            });
            setTimeout(() => {
                setSubmitted(false);
                navigate("/");
            }, 3000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "There was a problem booking your appointment. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="min-h-screen bg-neutral-950 py-12 lg:mt-5 flex items-center justify-center">
            <div className="max-w-6xl w-full mx-auto px-4">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div 
                        className="flex justify-center items-center gap-3 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CalendarCheck className="w-8 h-8 text-yellow-400" />
                        <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
                            Book an Appointment {selectedStyle && `for ${selectedStyle}`}
                        </span>
                    </motion.div>
                    <motion.h1 
                        className="text-4xl sm:text-5xl font-black mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
                            Reserve Your Session
                        </span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Fill out the form below to book your appointment. Our team will confirm your booking and get you ready for a stunning transformation!
                    </motion.p>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    className="bg-neutral-900 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-yellow-500/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex-1 p-8 lg:p-12 flex flex-col gap-6"
                        autoComplete="off"
                    >
                        <motion.div 
                            className="flex items-center gap-3 mb-4"
                            variants={itemVariants}
                        >
                            <div className="p-2 bg-yellow-500/10 rounded-lg">
                                <Scissors className="w-6 h-6 text-yellow-400" />
                            </div>
                            <span className="font-bold text-yellow-200 text-xl">Your Details</span>
                        </motion.div>

                        <motion.div
                            className="flex flex-col gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Name and Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants}>
                                    <label className="block text-yellow-200 mb-2 font-semibold">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            className="pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="block text-yellow-200 mb-2 font-semibold">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Email */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-yellow-200 mb-2 font-semibold">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        className="pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                                        placeholder="Email address"
                                    />
                                </div>
                            </motion.div>

                            {/* Service */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-yellow-200 mb-2 font-semibold">Service</label>
                                <select
                                    name="service"
                                    value={form.service}
                                    onChange={handleChange}
                                    required
                                    className="py-3 px-4 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                                >
                                    <option value="">Select a service</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.title}
                                        </option>
                                    ))}
                                </select>
                            </motion.div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <motion.div variants={itemVariants}>
                                    <label className="block text-yellow-200 mb-2 font-semibold">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={form.date}
                                        onChange={handleChange}
                                        className="py-3 px-4 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label className="block text-yellow-200 mb-2 font-semibold">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        required
                                        value={form.time}
                                        onChange={handleChange}
                                        className="py-3 px-4 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                                    />
                                </motion.div>
                            </div>

                            {/* Notes */}
                            <motion.div variants={itemVariants}>
                                <label className="block text-yellow-200 mb-2 font-semibold">Notes (optional)</label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    className="py-3 px-4 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all resize-none"
                                    placeholder="Tell us anything special (e.g., hair type, inspiration, allergies)..."
                                    rows={4}
                                />
                            </motion.div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="mt-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Booking...
                                </>
                            ) : (
                                <>
                                    <CalendarCheck className="w-6 h-6" />
                                    Book Appointment
                                </>
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-semibold text-center"
                                    aria-live="polite"
                                >
                                    {success}
                                </motion.div>
                            )}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold text-center"
                                    aria-live="polite"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {/* Sidebar Summary */}
                    <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-yellow-500/90 to-red-800/90 px-8 w-96 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                            <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative z-10 text-center">
                            <motion.h2 
                                className="text-3xl font-bold text-white mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                Why Book With Us?
                            </motion.h2>
                            
                            <motion.ul 
                                className="text-yellow-50 space-y-4 text-lg mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                {[
                                    { icon: Star, text: "Award-winning stylists" },
                                    { icon: Sparkles, text: "Bridal & event specialists" },
                                    { icon: "🎨", text: "Custom color & extensions" },
                                    { icon: Clock, text: "Flexible scheduling" },
                                    { icon: "💎", text: "Luxury experience" }
                                ].map((item, index) => (
                                    <motion.li 
                                        key={index}
                                        className="flex items-center gap-3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                    >
                                        {typeof item.icon === 'string' ? (
                                            <span className="text-2xl">{item.icon}</span>
                                        ) : (
                                            <item.icon className="w-5 h-5" />
                                        )}
                                        {item.text}
                                    </motion.li>
                                ))}
                            </motion.ul>

                            <motion.div 
                                className="text-center text-yellow-100 text-sm bg-white/10 backdrop-blur-lg rounded-2xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5 }}
                            >
                                <div className="font-semibold mb-2">Need help?</div>
                                <a href="tel:+2348061514604" className="underline hover:text-white transition-colors block">
                                    +234 806 151 4604
                                </a>
                                <a href="mailto:info@precioushairmpire.com" className="underline hover:text-white transition-colors block">
                                    info@precioushairmpire.com
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}