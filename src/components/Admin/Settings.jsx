// src/Pages/Admin/Settings.jsx
import {X, Linkedin, Phone, Mail, Instagram, Facebook,MapPin, Loader2,Save,MapPinCheckIcon} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../src/api/axios.js"; // Update the path to your apiClient


export default function Settings() {

  const [form, setForm] = useState({
    businessName: "",
    phone: "",
    email: "",
    address: "",
    googleMapAddress: "",
    facebook: "",
    instagram: "",
    x: "",
    linkedIn: "",
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
      const response = await apiClient.post("/settings/business/details/create", form);
      setSuccess(response.data.message);
      console.log(response);
      setSubmitted(true);
      setForm({
        businessName: "",
        email: "",
        phone: "",
        address: "",
        facebook: "",
        instagram: "",
        x: "",
        linkedIn: "",
      });
      setTimeout(() => {
        setSubmitted(false);
        // navigate("/");
      }, 2500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "There was a problem saving the business info. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      
      <h1 className="text-2xl font-bold text-yellow-100 mb-6">Settings</h1>

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

      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100">
        <h2 className="font-bold mb-4">Business Info</h2>
        <form 
            onSubmit={handleSubmit}
            className="flex-1 p-8 flex flex-col gap-5"
            autoComplete="on"
        >
          <div>
            <label className="block text-yellow-200 mb-1">Business Name</label>
            <input 
              type="text"
              name="businessName"
              required
              value={form.businessName}
              onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-yellow-700 text-yellow-100" 
            placeholder="Salon Name" />
          </div>

          {/* Contact Information  */}
          <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Official Mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Enter your mail"
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
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Official Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="address"
                      required
                      value={form.address}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Official address"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Google Map Address</label>
                  <div className="relative">
                    <MapPinCheckIcon className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="googleMapAddress"
                      required
                      value={form.googleMapAddress}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="Google Map address"
                    />
                  </div>
                </div>
              </div>
            </div>

          
              {/* Socials  */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Facebook</label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="facebook"
                      required
                      value={form.facebook}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="facebook name..."
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="instagram"
                      required
                      value={form.instagram}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="instagram handle..."
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">X</label>
                  <div className="relative">
                    <X className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="x"
                      required
                      value={form.x}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="X handle..."
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">LinkedIn</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="text"
                      name="linkedIn"
                      required
                      value={form.linkedIn}
                      onChange={handleChange}
                      className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="LinkedIn link..."
                    />
                  </div>
                </div>
              </div>

          </div>
          
          
          <button 
          disabled={loading}
          className="mt-2 px-6 w-fit py-2 bg-gradient-to-r from-yellow-500 to-red-800 rounded text-white font-bold hover:from-yellow-600 hover:to-red-900 transition"
          
          >
             {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin justify-start" />
                  Saving...
                </>
              ) : (
                <>
                  <div className="flex justify-start">
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </div>
                </>
              )}
          </button>
        </form>
      </div>
    </div>
  );
}
