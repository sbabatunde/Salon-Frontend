import { useState, useEffect } from "react";
import { Scissors, Sparkles, CalendarCheck, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function isEmbedUrl(url) {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("facebook.com") ||
    url.includes("tiktok.com") ||
    url.includes("instagram.com")
  );
}

function getEmbedUrl(url) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1] || "";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;
  }
  // Add other platforms as needed
  return url;
}

export default function Hero({ videos = [], BASE_URL }) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = videos.map((video) => {
    const src = video.video_url
      ? video.video_url
      : `${BASE_URL}/storage/${video.video_path?.replace(/^\/+/, "")}`;
    return {
      type: isEmbedUrl(src) ? "embed" : "video",
      src,
      title: video.title || "Salon Experience"
    };
  });

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length, isPlaying]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, idx) => (
          idx === current && (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              {slide.type === "video" ? (
                <video
                  src={slide.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(slide.src)}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                  title={slide.title}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
        >
          <motion.div 
            className="flex justify-center items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Luxury Hair Experience
            </span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-center mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-white">Your Dream</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Hair Awaits
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-yellow-100 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Transformative bridal styles, vibrant colors, and luxury extensions crafted with precision and passion.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="/booking"
              className="group relative inline-flex items-center gap-3 px-12 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-xl shadow-2xl transition-all overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CalendarCheck className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Book Your Session</span>
            </motion.a>

            <motion.a
              href="#portfolio"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-yellow-400 text-yellow-200 hover:bg-yellow-400 hover:text-neutral-900 font-semibold text-lg transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Scissors className="w-5 h-5" />
              View Our Gallery
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
        >
          ←
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white"
        >
          →
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? "bg-gradient-to-r from-yellow-500 to-red-800 scale-125"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-yellow-200/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}