import React, { useState, useMemo, useEffect } from "react";
import {
  X,
  UploadCloud,
  Clock,
  Text,
  TextQuote,
  BadgeCheck,
  Search,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../../../api/axios";
import { FaNairaSign } from "react-icons/fa6";

const ICON_NAMES = [
  "Scissors", "Brush", "Sparkles", "Flower2", "Star", "Heart", "Sun", "Moon",
  "Cloud", "Zap", "Anchor", "Bell", "Camera", "Coffee", "Gift", "Globe",
  "Home", "Music", "Phone", "Smile",
];

function RenderIcon({ iconName, className }) {
  const IconComponent = LucideIcons[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default function AddService({ isOpen, onClose, onServiceAdded }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: "",
    price: "",
    duration: "",
    status: "Active",
  });
  const [iconSearch, setIconSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setForm({
        title: "",
        description: "",
        icon: "",
        price: "",
        duration: "",
        status: "Active",
      });
      setIconSearch("");
      setLoading(false);
    }
  }, [isOpen]);

  const filteredIcons = useMemo(() => {
    if (!iconSearch) return ICON_NAMES;
    return ICON_NAMES.filter((name) =>
      name.toLowerCase().includes(iconSearch.toLowerCase())
    );
  }, [iconSearch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const cleaned = value.replace(/[^0-9,]/g, "");
      setForm((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleIconSelect = (iconName) => {
    setForm((prev) => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.icon || !form.price || !form.duration) {
      toast.error("Please fill all required fields and select an icon.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        icon: form.icon,
        price: Number(form.price.replace(/,/g, "")),
        duration: form.duration.trim(),
        status: form.status,
      };

      const res = await apiClient.post("/services/create", payload);
      toast.success("Service added successfully!");
      onServiceAdded?.(res.data);
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Failed to add service. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formatPriceOnKeyUp = () => {
    const raw = form.price.replace(/,/g, "");
      if (!isNaN(raw) && raw) {
        const formatted = parseInt(raw).toLocaleString();
        setForm((prev) => ({ ...prev, price: formatted }));
      }
  };


  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    // Close only if clicked on the backdrop, not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" 
         onClick={handleBackdropClick}>
      <div
        className="bg-neutral-900 border border-yellow-700 rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative animate-fade-in overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close modal"
          disabled={loading}
        >
          <X className="w-7 h-7" />
        </button>

        <h2 className="text-yellow-100 text-2xl font-extrabold mb-6 text-center tracking-wide">
          Add New Service
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-yellow-100">
          {/* Title */}
          <div className="relative">
            <Text className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Service Title"
              required
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Description */}
          <div className="relative">
            <TextQuote className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              required
              rows={3}
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Price */}
          <div className="relative">
            <FaNairaSign className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              onKeyUp={formatPriceOnKeyUp}
              placeholder="Price"
              required
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Duration */}
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="Duration (e.g. 30 mins)"
              required
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Status */}
          <div className="relative">
            <BadgeCheck className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Icon Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
            <input
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              placeholder="Search icon"
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Icon Picker */}
          <div className="grid grid-cols-6 gap-4 max-h-40 overflow-y-auto border border-yellow-700 p-3 rounded bg-neutral-800">
            {filteredIcons.map((icon) => (
              <button
                type="button"
                key={icon}
                onClick={() => handleIconSelect(icon)}
                className={`flex justify-center items-center p-2 rounded-lg border ${
                  form.icon === icon ? "border-yellow-400 bg-yellow-800" : "border-neutral-700"
                } hover:border-yellow-500 transition`}
              >
                <RenderIcon iconName={icon} className="text-yellow-100 w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
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
              <UploadCloud className="w-5 h-5" />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
