import React from "react"; // Add this import
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Services({ services }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const activeServices = services.filter(
    (service) => service.status === "Active"
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Safe icon rendering function
  const renderServiceIcon = (iconName) => {
    // Clean up the icon name (remove spaces, special characters, etc.)
    const cleanIconName = iconName?.replace(/[^a-zA-Z0-9]/g, '');
    
    // Check if the icon exists in LucideIcons
    const IconComponent = LucideIcons[cleanIconName];
    
    if (IconComponent) {
      return React.createElement(IconComponent, {
        className: "w-8 h-8 text-white",
      });
    }
    
    // Fallback icon
    return <span className="text-white text-2xl">✨</span>;
  };

  return (
    <section id="services" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-center mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Signature Services
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Discover our comprehensive range of luxury hair services, each designed to bring out your unique beauty and confidence.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {activeServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-neutral-900 rounded-2xl p-8 h-full overflow-hidden border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-yellow-500/10">
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-red-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <motion.div 
                  className="relative z-10 mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-red-800 shadow-lg">
                    {renderServiceIcon(service.icon)}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-3 group-hover:text-yellow-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-300 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Price if available */}
                  {service.price && (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-yellow-500/20">
                      <span className="text-yellow-200 font-semibold"></span>
                      <span className="text-2xl font-bold text-yellow-400">
                        ₦{parseInt(service.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-500 to-red-800 group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-neutral-300 text-lg mb-6">
            Ready to transform your look?
          </p>
          <motion.a
            href="/booking"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-2xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Your Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}