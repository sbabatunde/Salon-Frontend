import { Instagram, Facebook, Mail, Phone, MapPin, Scissors, ArrowUp, Heart, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Footer(props) {
  const { businessInfo } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide scroll to top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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

  const quickLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Book Now", href: "#book" },
    { name: "Contact", href: "#contact" }
  ];

  const businessHours = [
    { days: "Mon - Fri", hours: "9:00 AM - 7:00 PM" },
    { days: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { days: "Sunday", hours: "10:00 AM - 5:00 PM" }
  ];

  return (
    <>
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-800 rounded-full shadow-2xl flex items-center justify-center text-white transition-all ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        }`}
        whileHover={{ 
          scale: 1.1,
          background: "linear-gradient(135deg, #f59e0b, #dc2626)"
        }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* Main Footer */}
      <motion.footer 
        className="bg-gradient-to-br from-yellow-600 via-red-700 to-red-900 text-yellow-50 pt-16 pb-8 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Scissors className="w-6 h-6 text-yellow-600" />
                  </div>
                  <motion.div 
                    className="absolute -inset-1 bg-yellow-400 rounded-full blur-sm opacity-0 hover:opacity-50 transition-opacity"
                    whileHover={{ opacity: 0.5 }}
                  />
                </div>
                {businessInfo && (
                  <motion.div 
                    className="text-2xl font-black tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="bg-white text-yellow-600 px-3 py-1 rounded-lg shadow-lg inline-block">
                      {businessInfo.businessName}
                    </span>
                  </motion.div>
                )}
              </motion.div>
              
              <motion.p 
                className="text-yellow-100 text-lg leading-relaxed mb-6 max-w-sm"
                variants={itemVariants}
              >
                Where beauty meets artistry. Creating unforgettable bridal, color, and luxury hair experiences in the heart of Lagos.
              </motion.p>

              {/* Trust Badges */}
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={itemVariants}
              >
                <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-yellow-100 text-sm font-semibold border border-white/30">
                  ✨ Certified Stylists
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-yellow-100 text-sm font-semibold border border-white/30">
                  💫 Premium Products
                </span>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <motion.h4 
                className="font-bold text-xl mb-6 text-white flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                Quick Links
              </motion.h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="flex items-center gap-2 text-yellow-100 hover:text-white transition-colors group text-lg font-medium"
                      whileHover={{ x: 5 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Business Hours */}
            <motion.div 
              className="lg:col-span-1"
              variants={itemVariants}
            >
              <motion.h4 
                className="font-bold text-xl mb-6 text-white flex items-center gap-2"
                whileHover={{ x: 5 }}
              >
                <Clock className="w-5 h-5 text-yellow-300" />
                Business Hours
              </motion.h4>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <motion.div 
                    key={schedule.days}
                    className="flex justify-between items-center py-2 border-b border-yellow-200/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="text-yellow-100 font-medium">{schedule.days}</span>
                    <span className="text-yellow-200 bg-white/10 px-3 py-1 rounded-lg text-sm">
                      {schedule.hours}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact & Social */}
            {businessInfo && (
              <motion.div 
                className="lg:col-span-1"
                variants={itemVariants}
              >
                <motion.h4 
                  className="font-bold text-xl mb-6 text-white flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                  Get In Touch
                </motion.h4>
                
                <div className="space-y-4">
                  {/* Address */}
                  <motion.div 
                    className="flex items-start gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-5 h-5 text-yellow-300 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-yellow-100 leading-relaxed">{businessInfo.address}</span>
                  </motion.div>

                  {/* Phone */}
                  <motion.div 
                    className="flex items-center gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
                    <a 
                      href={`tel:${businessInfo.phone}`}
                      className="text-yellow-100 hover:text-white transition-colors font-medium"
                    >
                      {businessInfo.phone}
                    </a>
                  </motion.div>

                  {/* Email */}
                  <motion.div 
                    className="flex items-center gap-3 group"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
                    <a 
                      href={`mailto:${businessInfo.email}`}
                      className="text-yellow-100 hover:text-white transition-colors font-medium"
                    >
                      {businessInfo.email}
                    </a>
                  </motion.div>

                  {/* Social Media */}
                  <motion.div 
                    className="flex gap-4 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {businessInfo.instagram && (
                      <motion.a
                        href={businessInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center text-yellow-100 hover:bg-white hover:text-yellow-600 transition-all border border-white/20"
                        whileHover={{ 
                          scale: 1.1,
                          background: "linear-gradient(45deg, #E1306C, #F77737)"
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Instagram className="w-5 h-5" />
                      </motion.a>
                    )}
                    
                    {businessInfo.facebook && (
                      <motion.a
                        href={businessInfo.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center text-yellow-100 hover:bg-white hover:text-blue-600 transition-all border border-white/20"
                        whileHover={{ 
                          scale: 1.1,
                          background: "linear-gradient(45deg, #1877F2, #0A66C2)"
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Facebook className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Section */}
          <motion.div
            className="border-t border-yellow-200/30 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <motion.div 
                className="text-yellow-100 text-center md:text-left"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span>&copy; {currentYear}</span>
                  {businessInfo && (
                    <span className="font-semibold text-white">{businessInfo.businessName}</span>
                  )}
                  <span>All rights reserved.</span>
                </div>
              </motion.div>

              {/* Made with Love */}
              <motion.div 
                className="flex items-center gap-2 text-yellow-100"
                whileHover={{ scale: 1.05 }}
              >
                <span>Made with</span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Heart className="w-4 h-4 text-red-300 fill-red-300" />
                </motion.div>
                <span>in Lagos</span>
              </motion.div>

              {/* Additional Links */}
              <motion.div 
                className="flex gap-6 text-yellow-100 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.a 
                  href="/privacy" 
                  className="hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a 
                  href="/terms" 
                  className="hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  Terms of Service
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating CTA */}
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-yellow-600 rounded-full font-semibold shadow-2xl hover:shadow-yellow-200/30 transition-all"
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(135deg, #ffffff, #fefce8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Scissors className="w-4 h-4" />
            Book Now
          </motion.a>
        </motion.div>
      </motion.footer>
    </>
  );
}

export default Footer;