import { useState, useEffect } from "react";
import { Search, Filter, Calendar, Heart, Share2, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import apiClient from "../api/axios";
import Spinner from "../components/Spinner";

export default function ViewStyles() {
  const [styles, setStyles] = useState([]);
  const [filteredStyles, setFilteredStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await apiClient.get("/styles/show");
        const data = response.data?.data || [];
        setStyles(data);
        setFilteredStyles(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch styles.");
      } finally {
        setLoading(false);
      }
    };
    fetchStyles();
  }, []);

  // Filter styles based on search and category
  useEffect(() => {
    let filtered = styles;

    if (searchTerm) {
      filtered = filtered.filter(style =>
        style.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        style.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(style => style.category === selectedCategory);
    }

    setFilteredStyles(filtered);
  }, [searchTerm, selectedCategory, styles]);

  const categories = ["all", "bridal", "evening", "casual", "color", "extensions"];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="min-h-screen bg-neutral-950 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
            Style Gallery
          </span>
        </motion.h1>
        <motion.p 
          className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover our stunning collection of hair styles. Find inspiration for your next transformation and book your favorite look today!
        </motion.p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-neutral-900 rounded-2xl p-6 border border-yellow-500/10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400" />
              <input
                type="text"
                placeholder="Search styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-800 border border-yellow-500/20 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-yellow-500 to-red-800 text-white shadow-lg"
                      : "bg-neutral-800 text-neutral-400 hover:text-yellow-300 hover:bg-neutral-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-neutral-400">
          Showing {filteredStyles.length} of {styles.length} styles
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-red-400 text-xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-red-400 mb-2">Oops!</h3>
          <p className="text-neutral-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-800 rounded-lg text-white font-semibold hover:from-yellow-600 hover:to-red-900 transition"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* No Results */}
      {!loading && !error && filteredStyles.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-yellow-400 text-6xl mb-4">💇‍♀️</div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">No styles found</h3>
          <p className="text-neutral-400">
            {searchTerm || selectedCategory !== "all" 
              ? "Try adjusting your search or filter criteria."
              : "Check back soon for new styles!"
            }
          </p>
        </motion.div>
      )}

      {/* Styles Grid */}
      {!loading && !error && filteredStyles.length > 0 && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredStyles.map((style) => (
            <motion.div
              key={style.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={BASE_URL + style.image}
                  alt={style.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-center">
                      <motion.button
                        className="p-2 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedStyle(style)}
                      >
                        <ZoomIn className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                {style.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full backdrop-blur-lg">
                      {style.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-2 line-clamp-1">
                  {style.name}
                </h3>
                <p className="text-neutral-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {style.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={`/booking?style=${encodeURIComponent(style.name)}`}
                    className="flex-1 py-3 px-4 text-center bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-red-900 transition-all shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Book
                  </motion.a>
                  
                  <motion.button
                    className="p-3 bg-neutral-800 border border-yellow-500/20 text-yellow-400 rounded-xl hover:bg-neutral-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Style Modal */}
      <AnimatePresence>
        {selectedStyle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedStyle(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-neutral-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-yellow-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={BASE_URL + selectedStyle.image}
                  alt={selectedStyle.name}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedStyle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-lg rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <ZoomIn className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                  {selectedStyle.name}
                </h2>
                <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                  {selectedStyle.description}
                </p>
                
                <div className="flex gap-4">
                  <motion.a
                    href={`/booking?style=${encodeURIComponent(selectedStyle.name)}`}
                    className="flex-1 py-4 px-6 text-center bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg rounded-xl hover:from-yellow-600 hover:to-red-900 transition-all shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-5 h-5 inline mr-2" />
                    Book This Style
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      {!loading && !error && (
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-red-800/10 border border-yellow-500/20 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">
              Can't Find Your Perfect Style?
            </h3>
            <p className="text-neutral-300 mb-6">
              Our expert stylists can create a custom look just for you. Book a consultation to discuss your vision!
            </p>
            <motion.a
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calendar className="w-5 h-5" />
              Book Consultation
            </motion.a>
          </div>
        </motion.div>
      )}
    </section>
  );
}