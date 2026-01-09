// components/Clients/Modals/EditClient.jsx
import { useState, useEffect } from "react";
import { X, Save, User, Mail, Phone, Scissors, Calendar, Clock, MessageSquare } from "lucide-react";

export default function EditClientModal({ isOpen, onClose, client, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        phone: client.phone || "",
        email: client.email || "",
        service: client.service || "",
        date: client.date || "",
        time: client.time || "",
        notes: client.notes || "",
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: client.id, // ← Add this line to include the ID
    });
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-yellow-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close modal"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Modal Title */}
        <h2 className="text-yellow-100 text-2xl font-extrabold mb-6 text-center">
          Edit Client Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Client Name"
              className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600"
              required
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-blue-700 text-blue-100"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-green-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-green-700 text-green-100"
            />
          </div>

          {/* Service */}
          <div className="relative">
            <Scissors className="absolute left-3 top-3 w-5 h-5 text-amber-400" />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-amber-700 text-amber-100"
              required
            >
              <option value="">Select Service</option>
              <option value="Haircut">Haircut</option>
              <option value="Hair Coloring">Hair Coloring</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Hair Treatment">Hair Treatment</option>
              <option value="Extensions">Extensions</option>
              <option value="Braiding">Braiding</option>
              <option value="Weaving">Weaving</option>
              <option value="Consultation">Consultation</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-purple-700 text-purple-100"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-3 w-5 h-5 text-pink-400" />
              <input
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-pink-700 text-pink-100"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-teal-400" />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional Notes"
              rows="3"
              className="pl-10 py-3 w-full rounded-lg bg-neutral-800 border border-teal-700 text-teal-100 placeholder-teal-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold hover:from-yellow-600 hover:to-red-900 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}