import { MapPin, Phone, Mail, Instagram, Facebook, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function ContactInfo(props) {
  const { businessInfo } = props;
  const [mapLoaded, setMapLoaded] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: businessInfo?.phone,
      href: `tel:${businessInfo?.phone}`,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      label: "Email Us",
      value: businessInfo?.email,
      href: `mailto:${businessInfo?.email}`,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: businessInfo?.address,
      href: businessInfo?.googleMapAddress,
      color: "from-red-500 to-red-600"
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon - Sat: 9AM - 7PM\nSun: 10AM - 5PM",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: businessInfo?.instagram,
      color: "from-pink-500 to-purple-600"
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: businessInfo?.facebook,
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/${businessInfo?.phone?.replace(/\D/g, '')}`,
      color: "from-green-500 to-green-600"
    }
  ];

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

  return (
    <section id="contact" className="py-20 bg-neutral-950">
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
            <MapPin className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Get In Touch
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Let's Create Magic Together
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Have questions or ready to book your appointment? We're here to help and excited to bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Methods */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  target={method.href?.startsWith('http') ? '_blank' : '_self'}
                  rel={method.href?.startsWith('http') ? 'noopener noreferrer' : ''}
                  variants={itemVariants}
                  className="group bg-neutral-900 rounded-2xl p-6 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-yellow-400 font-semibold mb-2">{method.label}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                    {method.value}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="bg-neutral-900 rounded-2xl p-8 border border-yellow-500/10"
            >
              <h3 className="text-yellow-400 font-semibold text-lg mb-6 text-center">
                Follow Our Journey
              </h3>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${social.color} hover:shadow-2xl transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-yellow-500/20">
              {/* Loading State */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center z-10">
                  <motion.div
                    className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              )}

              {/* Google Map */}
              <iframe
                title="Salon Location"
                src={businessInfo?.googleMapAddress}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setMapLoaded(true)}
                className={`transition-opacity duration-500 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>

            {/* Quick Actions */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/booking"
                className="bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-semibold py-4 rounded-xl text-center transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.a>
              <motion.a
                href="#services"
                className="bg-neutral-800 border border-yellow-500/30 hover:bg-neutral-700 text-yellow-200 font-semibold py-4 rounded-xl text-center transition-all"
                whileHover={{ scale: 1.02 }}
              >
                View Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Emergency/Quick Contact */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-red-800/10 border border-yellow-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-neutral-300 mb-6">
              For urgent inquiries or last-minute bookings, don't hesitate to reach out directly.
            </p>
            <motion.a
              href={`tel:${businessInfo?.phone}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
              Call Now: {businessInfo?.phone}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactInfo;