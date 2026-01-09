import { CalendarCheck, Sparkles, Clock, Scissors, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function Booking() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    { icon: Clock, text: "Flexible Scheduling" },
    { icon: Scissors, text: "Expert Stylists" },
    { icon: Sparkles, text: "Custom Consultations" },
    { icon: Phone, text: "Easy Rescheduling" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="book" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-red-700 to-purple-900">
        <motion.div
          className="absolute inset-0 bg-black/20"
          animate={{
            background: [
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.2)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
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
            <Sparkles className="w-8 h-8 text-white" />
            <span className="uppercase tracking-widest text-white font-semibold text-lg">
              Your Transformation Awaits
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready for Your
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-white text-transparent bg-clip-text">
              Dream Look?
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            Whether it's your wedding day, a special event, or you're simply ready for a change, 
            our team is here to make your vision a reality. Secure your spot and step into a world 
            of beauty, confidence, and exceptional service.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 mb-4 group-hover:bg-white/20 transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <feature.icon className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <p className="text-yellow-100 font-semibold text-sm md:text-base drop-shadow">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/booking"
            className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-white text-yellow-700 font-bold text-xl shadow-2xl transition-all overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300"
              animate={{
                background: isHovered 
                  ? ['linear-gradient(to right, #facc15, #fef08a)']
                  : ['linear-gradient(to right, #ffffff, #fefce8)']
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12"
              animate={{
                x: isHovered ? ['0%', '200%'] : '0%'
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            <CalendarCheck className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Book Appointment</span>
          </motion.a>

          <motion.a
            href="tel:+2348051460844"
            className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl border-2 border-yellow-300 text-yellow-200 hover:bg-yellow-300 hover:text-yellow-900 font-semibold text-lg transition-all backdrop-blur-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-5 h-5" />
            Call Now
          </motion.a>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap gap-6 justify-center text-yellow-100/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Same-day appointments available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Free consultation included
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Flexible cancellation policy
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Booking;