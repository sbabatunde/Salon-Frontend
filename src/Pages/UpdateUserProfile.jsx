import { useState, useEffect } from "react";
import { User, Mail, Loader2, Save, Camera, Shield, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../../src/api/axios";

export default function Profile() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "",
    phone: "",
    preferences: {
      emailNotifications: true,
      smsNotifications: false
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate API call - replace with your actual endpoint
        const response = await apiClient.get("/user/profile");
        setForm({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          preferences: response.data.preferences || {
            emailNotifications: true,
            smsNotifications: false
          }
        });
      } catch {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const prefKey = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    
    if (success) setSuccess("");
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      await apiClient.put("/user/profile", form);
      setSuccess("Profile updated successfully!");
      
      // Auto-hide success message
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-yellow-300">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Shield },
    { id: "history", label: "Appointments", icon: Calendar }
  ];

  return (
    <section className="min-h-screen bg-neutral-950 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl font-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Your Profile
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-neutral-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Manage your account settings and preferences
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-yellow-500/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Tabs */}
          <div className="border-b border-yellow-500/10">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 min-w-max ${
                    activeTab === tab.id
                      ? "text-yellow-400 border-yellow-400 bg-yellow-400/10"
                      : "text-neutral-400 border-transparent hover:text-yellow-300 hover:bg-neutral-800"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.form
                  key="profile"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex flex-col gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Profile Picture */}
                    <motion.div variants={itemVariants} className="text-center">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-red-800 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                          {form.name ? form.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <button
                          type="button"
                          className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-yellow-600 transition-colors"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>

                    {/* Name and Email */}
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
                            placeholder="Your full name"
                          />
                        </div>
                      </motion.div>

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
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Phone */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-yellow-200 mb-2 font-semibold">Phone Number</label>
                      <div className="relative">
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                          placeholder="+234 806 151 4604"
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={saving}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-6 h-6" />
                        Save Changes
                      </>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-semibold text-center"
                      >
                        {success}
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}

              {activeTab === "preferences" && (
                <motion.div
                  key="preferences"
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold text-yellow-300 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Notification Preferences
                  </motion.h3>

                  <div className="space-y-4">
                    {[
                      {
                        id: 'emailNotifications',
                        label: 'Email Notifications',
                        description: 'Receive updates about appointments and promotions via email'
                      },
                      {
                        id: 'smsNotifications',
                        label: 'SMS Notifications',
                        description: 'Get text message reminders for your appointments'
                      }
                    ].map((pref, index) => (
                      <motion.div
                        key={pref.id}
                        className="flex items-start gap-4 p-4 bg-neutral-800/50 rounded-xl border border-yellow-500/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name={`preferences.${pref.id}`}
                            checked={form.preferences[pref.id]}
                            onChange={handleChange}
                            className="w-4 h-4 text-yellow-500 bg-neutral-700 border-yellow-500 rounded focus:ring-yellow-500 focus:ring-2"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="font-semibold text-yellow-200">
                            {pref.label}
                          </label>
                          <p className="text-neutral-400 text-sm mt-1">
                            {pref.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "history" && (
                <motion.div
                  key="history"
                  className="text-center py-12"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-bold text-yellow-300 mb-2">
                    Appointment History
                  </h3>
                  <p className="text-neutral-400">
                    Your appointment history will appear here after your first booking.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Account Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { label: "Appointments", value: "0", color: "from-yellow-500 to-yellow-600" },
            { label: "Loyalty Points", value: "150", color: "from-red-500 to-red-600" },
            { label: "Member Since", value: "2024", color: "from-yellow-500 to-red-800" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-neutral-900 rounded-2xl p-6 text-center border border-yellow-500/10"
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-3xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-2`}>
                {stat.value}
              </div>
              <div className="text-neutral-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}