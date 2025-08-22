import { useState, useEffect } from "react";
import { User, Mail, Loader2 } from "lucide-react";
import apiClient from "../../src/api/axios"; // Adjust path if needed

export default function Profile() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/user/profile"); // Adjust endpoint
        setForm({
          name: response.data.name,
          email: response.data.email,
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess("");
    setError("");

    try {
      await apiClient.put("/user/profile", form); // Adjust endpoint
      setSuccess("Profile updated successfully!");
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-950 py-16 flex items-center justify-center">
      <div className="bg-neutral-900 rounded-2xl shadow-lg max-w-md w-full p-8">
        <h1 className="text-3xl font-bold text-yellow-300 mb-6 text-center">Update Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
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
                placeholder="Your name"
              />
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
                placeholder="Your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold flex items-center justify-center"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          {success && <p className="text-green-400 text-center mt-4">{success}</p>}
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
}
