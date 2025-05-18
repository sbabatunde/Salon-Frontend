import { useState, useEffect } from "react";
import { X, Save, Calendar, User, Scissors, Mail, Phone,CircleDot  } from "lucide-react";

export default function EditAppointment({ isOpen, onClose, appointment, onSave }) {
  const [formData, setFormData] = useState(appointment || {});
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    setFormData(appointment || {});
  }, [appointment]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true); //make the loading show
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="bg-neutral-900 border border-yellow-700 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close modal"
          disabled={loading}
        >
          <X className="w-7 h-7" />
        </button>

        {/* Modal Title */}
        <h2 id="modal-title" className="text-yellow-100 text-2xl font-extrabold mb-6 text-center tracking-wide">
          Edit Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Client Name"
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {/* Service */}
          <div className="relative">
            <Scissors className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <select
              name="service"
              value={formData.service || ""}
              onChange={handleChange}
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option  value={formData.service || ""} disabled>
                {formData.service}
              </option>
              <option value="Haircut">Haircut</option>
              <option value="Hair Coloring">Hair Coloring</option>
              <option value="Styling">Styling</option>
              <option value="Treatment">Treatment</option>
              {/* Add more options as needed */}
            </select>

          </div>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {/* Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          {/* Time */}
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="time"
              type="time"
              value={formData.time || ""}
              onChange={handleChange}
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

           {/* Status */}
           <div className="relative">
              <CircleDot  className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              >
                <option  value={formData.status || ""} disabled>
                  {formData.status}
                </option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                {/* Add more options as needed */}
              </select>
            </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-yellow-700 text-yellow-100 hover:bg-neutral-800 hover:text-yellow-400 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold flex items-center gap-2 hover:from-yellow-600 hover:to-red-900 transition"
              disabled={loading}
            >
              <Save className="w-5 h-5" />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
      {/* Fade-in animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
