import { Camera, Sparkles, X, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Portfolio({ images = [], BASE_URL }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedImages, setLikedImages] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validImages = images.filter(img => img.image);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= validImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? validImages.length - 1 : prev - 1
    );
  };

  const toggleLike = (imageId, e) => {
    e.stopPropagation();
    setLikedImages(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(imageId)) {
        newLiked.delete(imageId);
      } else {
        newLiked.add(imageId);
      }
      return newLiked;
    });
  };

  const shareImage = async (image, e) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({
          title: image.title,
          text: `Check out this amazing hair transformation from Precious Hairmpire: ${image.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  // Auto-play slideshow for carousel (stops when modal is open)
  useEffect(() => {
    if (validImages.length <= 1 || isModalOpen) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [validImages.length, isModalOpen]);

  // Calculate visible images - show 5 cards with closer spacing
  const getVisibleImages = () => {
    const total = validImages.length;
    if (total === 0) return [];
    
    const visible = [];
    
    // Show up to 5 cards: 2 left, 1 center, 2 right
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      if (index >= 0 && index < total) {
        let position, scale, opacity, zIndex, xOffset;
        
        if (i === 0) {
          // Center card
          position = 'center';
          scale = 1;
          opacity = 1;
          zIndex = 30;
          xOffset = 0;
        } else if (i === -1) {
          // Left 1
          position = 'left';
          scale = 0.9;
          opacity = 0.8;
          zIndex = 20;
          xOffset = -120;
        } else if (i === 1) {
          // Right 1
          position = 'right';
          scale = 0.9;
          opacity = 0.8;
          zIndex = 20;
          xOffset = 120;
        } else if (i === -2) {
          // Left 2
          position = 'far-left';
          scale = 0.8;
          opacity = 0.6;
          zIndex = 10;
          xOffset = -220;
        } else if (i === 2) {
          // Right 2
          position = 'far-right';
          scale = 0.8;
          opacity = 0.6;
          zIndex = 10;
          xOffset = 220;
        }
        
        visible.push({ 
          image: validImages[index], 
          index: index, 
          position,
          scale,
          opacity,
          zIndex,
          xOffset
        });
      }
    }
    
    return visible;
  };

  const visibleImages = getVisibleImages();

  return (
    <section id="portfolio" className="py-20 bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
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
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Our Portfolio
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Transformations Gallery
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Witness the artistry and passion in every style we create. Browse through our stunning transformations.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-[400px] flex items-center justify-center">
          {/* Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-neutral-800 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-neutral-800 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </>
          )}

          {/* Cards Container */}
          <div className="relative w-full max-w-6xl mx-auto h-80 flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {visibleImages.map(({ image, index, position, scale, opacity, zIndex, xOffset }) => (
                <motion.div
                  key={image.id || index}
                  initial={{ 
                    opacity: 0,
                    x: xOffset,
                    scale: 0.8,
                    zIndex: zIndex
                  }}
                  animate={{ 
                    opacity: opacity,
                    x: xOffset,
                    scale: scale,
                    zIndex: zIndex
                  }}
                  exit={{ 
                    opacity: 0,
                    x: xOffset,
                    scale: 0.8
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    position === 'center' 
                      ? 'w-72 h-80 shadow-yellow-500/30 border-2 border-yellow-500/50' 
                      : 'w-56 h-64 border border-yellow-500/20'
                  }`}>
                    <img
                      src={`${BASE_URL}/storage/${image.image}`}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Overlay - Show on all cards but different intensity */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end transition-all duration-300 ${
                      position === 'center' ? 'opacity-100' : 'opacity-60'
                    }`}>
                      <div className="p-4 text-center">
                        <h3 className={`font-bold drop-shadow-lg ${
                          position === 'center' 
                            ? 'text-white text-lg' 
                            : 'text-yellow-200 text-sm'
                        }`}>
                          {image.title}
                        </h3>
                        {position === 'center' && (
                          <p className="text-yellow-200 text-xs mt-1">
                            Click to view
                          </p>
                        )}
                      </div>

                      {/* Action Buttons - Only on center card */}
                      {position === 'center' && (
                        <div className="absolute top-3 right-3 flex gap-1">
                          <motion.button
                            onClick={(e) => toggleLike(image.id || index, e)}
                            className="p-1 bg-black/70 backdrop-blur-lg rounded-full text-white hover:bg-red-500 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart 
                              className={`w-3 h-3 ${likedImages.has(image.id || index) ? 'fill-red-500 text-red-500' : ''}`} 
                            />
                          </motion.button>
                          <motion.button
                            onClick={(e) => shareImage(image, e)}
                            className="p-1 bg-black/70 backdrop-blur-lg rounded-full text-white hover:bg-blue-500 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Share2 className="w-3 h-3" />
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* Camera Icon - Only on center card */}
                    {position === 'center' && (
                      <Camera className="absolute top-3 left-3 w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Image Counter and Progress Dots */}
        {validImages.length > 0 && (
          <div className="flex flex-col items-center gap-4 mt-8">
            {/* Image Counter */}
            <div className="text-neutral-300 text-sm">
              <span className="text-yellow-400 font-bold">{currentIndex + 1}</span>
              <span className="mx-2">of</span>
              <span>{validImages.length}</span>
            </div>

            {/* Progress Dots */}
            {validImages.length > 1 && (
              <div className="flex justify-center gap-2">
                {validImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-yellow-500 to-red-800 scale-125"
                        : "bg-neutral-600 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {validImages.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Camera className="w-16 h-16 text-yellow-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-yellow-400 mb-2">Coming Soon</h3>
            <p className="text-neutral-400">We're preparing our amazing transformations gallery. Check back soon!</p>
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-6xl h-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 z-10 p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>

                {/* Navigation Buttons */}
                {validImages.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all backdrop-blur-lg z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={24} />
                    </motion.button>

                    <motion.button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all backdrop-blur-lg z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={24} />
                    </motion.button>
                  </>
                )}

                {/* Large Bold Image */}
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={`${BASE_URL}/storage/${validImages[currentIndex]?.image}`}
                    alt={validImages[currentIndex]?.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    style={{ 
                      filter: 'brightness(1.1) contrast(1.1)',
                      transform: 'scale(1.02)'
                    }}
                  />
                </div>

                {/* Caption & Navigation Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {validImages[currentIndex]?.title}
                      </h3>
                      {validImages[currentIndex]?.description && (
                        <p className="text-yellow-200 text-base">
                          {validImages[currentIndex]?.description}
                        </p>
                      )}
                    </div>
                    <div className="text-yellow-200 text-lg font-semibold ml-4 whitespace-nowrap">
                      {currentIndex + 1} / {validImages.length}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-300 text-lg mb-6">
            Inspired by what you see?
          </p>
          <motion.a
            href="/booking"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Transformation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Portfolio;