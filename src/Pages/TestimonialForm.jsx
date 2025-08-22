import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User, Mail, MessageCircle, Loader2, Star, Image as ImageIcon, Smile, ThumbsUp
} from "lucide-react";
import apiClient from "../../src/api/axios";
import { toast } from "react-toastify";

export default function TestimonialForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [testimonial, setTestimonial] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    review: "",
    rating: 5,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const imageInputRef = useRef();

  // Fetch testimonial data on mount
  useEffect(() => {
    apiClient.get(`/testimonials/form/${token}`)
      .then(res => {
        setTestimonial(res.data.testimonial);
        setForm(f => ({
          ...f,
          name: res.data.testimonial.name || "",
          email: res.data.testimonial.email || "",
        }));
      })
      .catch(err => {
        toast.error("This testimonial link is invalid or expired.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    // Clear image error when user selects a new file
    if (errors.image) {
      setErrors(prev => ({ ...prev, image: null }));
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setErrors({});

  try {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("review", form.review);
    formData.append("rating", form.rating.toString()); // Ensure it's string
    
    // Only append image if it's a valid file and has size > 0
    if (form.image instanceof File && form.image.size > 0) {
      console.log('Appending image:', form.image.name, form.image.type, form.image.size);
      formData.append("image", form.image);
    } else if (form.image) {
      console.log('Invalid image file:', form.image);
    }

    await apiClient.post(`/testimonials/form/${token}`, formData,  {
        headers: { "Content-Type": "multipart/form-data" },
      });

    toast.success("Thank you for your testimonial! Redirecting...");
    setTimeout(() => navigate("/"), 2500);
    
  } catch (err) {
    console.error('Submission error:', err);
    
    if (err.response?.status === 422 && err.response?.data?.errors) {
      const validationErrors = err.response.data.errors;
      setErrors(validationErrors);
      
      const firstError = Object.values(validationErrors)[0]?.[0];
      if (firstError) {
        toast.error(firstError);
      }
    } else {
      const errorMessage = err.response?.data?.message || 
                          "Submission failed. Please try again.";
      toast.error(errorMessage);
    }
  } finally {
    setSubmitting(false);
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
      <div className="max-w-4xl w-full mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-3">
            <ThumbsUp className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              Share Your Experience
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
              Leave a Testimonial
            </span>
          </h1>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto">
            Your feedback helps us grow and inspire others. Please fill out the form below to share your experience!
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
              <Smile className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold text-yellow-200">Your Testimonial</span>
            </div>
            <div className="flex flex-col gap-4">
              {/* Name and Email */}
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
                      className={`pl-10 py-2 w-full rounded bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-yellow-700 focus:ring-yellow-500'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name[0]}</p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-yellow-200 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={`pl-10 py-2 w-full rounded bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-yellow-700 focus:ring-yellow-500'
                      }`}
                      placeholder="Your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email[0]}</p>
                  )}
                </div>
              </div>
              {/* Review */}
              <div>
                <label className="block text-yellow-200 mb-1">Your Message</label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                  <textarea
                    name="review"
                    required
                    value={form.review}
                    onChange={handleChange}
                    rows="4"
                    className={`pl-10 py-2 w-full rounded bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 ${
                      errors.review ? 'border-red-500 focus:ring-red-500' : 'border-yellow-700 focus:ring-yellow-500'
                    }`}
                    placeholder="Share your feedback..."
                  />
                </div>
                {errors.review && (
                  <p className="text-red-400 text-sm mt-1">{errors.review[0]}</p>
                )}
              </div>
              {/* Rating */}
              <div>
                <label className="block text-yellow-200 mb-1">Rating</label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className={`pl-10 py-2 w-full rounded bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 ${
                      errors.rating ? 'border-red-500 focus:ring-red-500' : 'border-yellow-700 focus:ring-yellow-500'
                    }`}
                  >
                    {[5, 4, 3, 2, 1].map((rate) => (
                      <option key={rate} value={rate}>
                        {Array(rate).fill('★').join('')} ({rate})
                      </option>
                    ))}
                  </select>
                </div>
                {errors.rating && (
                  <p className="text-red-400 text-sm mt-1">{errors.rating[0]}</p>
                )}
              </div>
              {/* Image Upload with Preview */}
              <div>
                <label className="block text-yellow-200 mb-1">Photo (optional)</label>
                <div className="flex items-center gap-4">
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={imageInputRef}
                      onChange={handleImageChange}
                    />
                    <div className={`flex items-center px-4 py-2 bg-neutral-800 border rounded text-yellow-100 hover:bg-neutral-700 transition ${
                      errors.image ? 'border-red-500' : 'border-yellow-700'
                    }`}>
                      <ImageIcon className="w-5 h-5 mr-2 text-yellow-400" />
                      {form.image?.name || "Choose Image"}
                    </div>
                  </label>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 rounded object-cover border-2 border-yellow-500 shadow"
                    />
                  )}
                </div>
                <div className="text-xs text-neutral-400 mt-1">Max size: 2MB. JPG, PNG, or GIF.</div>
                {errors.image && (
                  <p className="text-red-400 text-sm mt-1">{errors.image[0]}</p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-red-900 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Submit Testimonial
                </>
              )}
            </button>
          </form>
          {/* Sidebar */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-yellow-500/90 to-red-800/90 px-8 w-80">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Why Leave a Testimonial?</h2>
            <ul className="text-yellow-50 space-y-3 text-lg">
              <li>🌟 Help others trust our service</li>
              <li>💬 Your voice matters</li>
              <li>🏆 We value your feedback</li>
              <li>🎁 Surprise rewards for top testimonials</li>
              <li>🤝 Join our happy community</li>
            </ul>
            <div className="mt-8 text-center text-yellow-100 text-sm">
              <div>Need help?</div>
              <a href="tel:+2348061514604" className="underline hover:text-white">
                +234 806 151 4604
              </a>
              <br />
              <a href="mailto:info@precioushairmpire.com" className="underline hover:text-white">
                info@precioushairmpire.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}