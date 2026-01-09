import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Testimonials({ testimonials = [], BASE_URL }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  if (!testimonials.length) {
    return (
      <section id="testimonials" className="py-20 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Quote className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl text-yellow-200">No testimonials yet</h3>
          <p className="text-neutral-300 mt-2">Be the first to share your experience!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-neutral-950 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex justify-center items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Quote className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Client Love
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Stories of Transformation
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our amazing clients about their experiences and transformations.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-yellow-500/20 max-w-2xl mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Client Image */}
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="relative">
                        <img
                          src={`${BASE_URL}${testimonials[currentIndex].image_url}`}
                          alt={testimonials[currentIndex].name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                          <Quote className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Stars */}
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star 
                              className={`w-5 h-5 ${
                                i < testimonials[currentIndex].rating 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-neutral-600"
                              }`} 
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Review Text */}
                      <motion.blockquote 
                        className="text-lg md:text-xl text-neutral-200 italic leading-relaxed mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        "{testimonials[currentIndex].review}"
                      </motion.blockquote>

                      {/* Client Info */}
                      <div>
                        <cite className="not-italic font-bold text-yellow-300 text-lg block">
                          {testimonials[currentIndex].name}
                        </cite>
                        {testimonials[currentIndex].service && (
                          <span className="text-neutral-400 text-sm">
                            {testimonials[currentIndex].service}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 bg-neutral-800 rounded-full text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 bg-neutral-800 rounded-full text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-gradient-to-r from-yellow-500 to-red-800 scale-125"
                  : "bg-neutral-600 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-300 text-lg mb-6">
            Ready to create your own success story?
          </p>
          <motion.a
            href="/booking"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Share Your Experience
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}