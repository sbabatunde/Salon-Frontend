import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User, Mail, MessageCircle, Loader2, Star, Image as ImageIcon, 
  Smile, ThumbsUp, Camera, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be less than 2MB");
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      setForm({ ...form, image: file });
      
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: null }));
      }
      
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setForm({ ...form, image: null });
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("review", form.review);
      formData.append("rating", form.rating.toString());
      
      if (form.image instanceof File && form.image.size > 0) {
        formData.append("image", form.image);
      }

      await apiClient.post(`/testimonials/form/${token}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Thank you for your testimonial! Redirecting...");
      setTimeout(() => navigate("/"), 2500);
      
    } catch (err) {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
          <p className="text-yellow-300">Loading testimonial form...</p>
        </motion.div>
      </div>
    );
  }

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
    <section className="min-h-screen bg-neutral-950 py-8 flex items-center justify-center">
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
            <ThumbsUp className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Share Your Experience
            </span>
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl font-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Leave a Testimonial
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your feedback helps us grow and inspire others. Share your experience and help future clients make their decision!
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
                <Smile className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="font-bold text-yellow-200 text-xl">Your Testimonial</span>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
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
                      className={`pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : 'border-yellow-500/20 focus:ring-yellow-500 focus:border-yellow-500'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2">{errors.name[0]}</p>
                  )}
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
                      className={`pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-yellow-500/20 focus:ring-yellow-500 focus:border-yellow-500'
                      }`}
                      placeholder="Your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2">{errors.email[0]}</p>
                  )}
                </motion.div>
              </div>

              {/* Rating */}
              <motion.div variants={itemVariants}>
                <label className="block text-yellow-200 mb-2 font-semibold">Rating</label>
                <div className="relative">
                  <Star className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
                  <select
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className={`pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 transition-all ${
                      errors.rating ? 'border-red-500 focus:ring-red-500' : 'border-yellow-500/20 focus:ring-yellow-500 focus:border-yellow-500'
                    }`}
                  >
                    {[5, 4, 3, 2, 1].map((rate) => (
                      <option key={rate} value={rate}>
                        {'★'.repeat(rate)} {rate} Star{rate !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.rating && (
                  <p className="text-red-400 text-sm mt-2">{errors.rating[0]}</p>
                )}
              </motion.div>

              {/* Review */}
              <motion.div variants={itemVariants}>
                <label className="block text-yellow-200 mb-2 font-semibold">Your Message</label>
                <div className="relative">
                  <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-yellow-400" />
                  <textarea
                    name="review"
                    required
                    value={form.review}
                    onChange={handleChange}
                    rows="6"
                    className={`pl-12 pr-4 py-3 w-full rounded-xl bg-neutral-800 border text-yellow-100 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.review ? 'border-red-500 focus:ring-red-500' : 'border-yellow-500/20 focus:ring-yellow-500 focus:border-yellow-500'
                    }`}
                    placeholder="Share your experience with Precious Hairmpire..."
                  />
                </div>
                {errors.review && (
                  <p className="text-red-400 text-sm mt-2">{errors.review[0]}</p>
                )}
              </motion.div>

              {/* Image Upload */}
              <motion.div variants={itemVariants}>
                <label className="block text-yellow-200 mb-2 font-semibold">Photo (optional)</label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="relative cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                      <motion.div 
                        className={`flex items-center px-6 py-3 bg-neutral-800 border rounded-xl text-yellow-100 hover:bg-neutral-700 transition-all ${
                          errors.image ? 'border-red-500' : 'border-yellow-500/20 hover:border-yellow-500/40'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Camera className="w-5 h-5 mr-3 text-yellow-400" />
                        {form.image?.name || "Choose Image"}
                      </motion.div>
                    </label>
                    
                    <AnimatePresence>
                      {imagePreview && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="relative"
                        >
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 rounded-xl object-cover border-2 border-yellow-500 shadow-lg"
                          />
                          <motion.button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-3 h-3" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="text-sm text-neutral-400">
                    Max size: 2MB. JPG, PNG, or GIF. Show us your amazing hair transformation!
                  </div>
                  {errors.image && (
                    <p className="text-red-400 text-sm mt-2">{errors.image[0]}</p>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              className="mt-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <MessageCircle className="w-6 h-6" />
                  Submit Testimonial
                </>
              )}
            </motion.button>
          </form>

          {/* Sidebar */}
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
                Why Share Your Story?
              </motion.h2>
              
              <motion.ul 
                className="text-yellow-50 space-y-4 text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { icon: "🌟", text: "Help others trust our service" },
                  { icon: "💬", text: "Your voice matters to us" },
                  { icon: "🏆", text: "We value your honest feedback" },
                  { icon: "🎁", text: "Surprise rewards for top testimonials" },
                  { icon: "🤝", text: "Join our happy community" }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="text-2xl">{item.icon}</span>
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