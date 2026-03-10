import { User, Award, Instagram, Mail, Sparkles, Star, Briefcase, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function Team({ stylists = [],BASE_URL }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const handleImageError = (stylistId) => {
    setImageErrors(prev => ({ ...prev, [stylistId]: true }));
  };

  // If no stylists, don't render the section
  if (!stylists || stylists.length === 0) {
    return null;
  }

  // Determine grid columns based on number of stylists
  const getGridClass = () => {
    const count = stylists.length;
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="team" className="py-20 bg-neutral-950 relative overflow-hidden">
      {/* Dark Background with subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-red-800/5"></div>
      
      {/* Floating Elements - subtle */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-red-800 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header - with dark background styling */}
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
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-red-800">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Meet the Artists
            </span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Master Stylists
            </span>
          </h2>
          
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Our talented team of certified stylists brings passion, expertise, and creativity to every transformation. 
            Get to know the artists who will make your beauty dreams a reality.
          </p>

          {/* Decorative Line */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-800 mx-auto mt-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className={`grid ${getGridClass()} gap-8 auto-rows-fr`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stylists.map((member, index) => {
            const isHovered = hoveredCard === index;
            const hasImageError = imageErrors[member.id];

            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                className="group relative h-full"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card Container - Dark theme with gradient borders */}
                <div className={`
                  bg-neutral-900/90 backdrop-blur-sm
                  rounded-3xl overflow-hidden
                  border-2 transition-all duration-500
                  ${isHovered 
                    ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20' 
                    : 'border-neutral-800'}
                  h-full flex flex-col
                  relative
                `}>
                  
                  {/* Gradient Overlay on Hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-red-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                  />

                  {/* Top Accent Bar */}
                  <div className={`h-2 w-full bg-gradient-to-r from-yellow-500 via-red-700 to-red-900`} />

                  {/* Profile Section */}
                  <div className="p-8 pt-6 flex flex-col items-center relative">
                    {/* Profile Image with Glow */}
                    <div className="relative mb-6">
                      <div className={`
                        absolute inset-0 rounded-full 
                        bg-gradient-to-r from-yellow-500 to-red-800 
                        opacity-75 blur-md transition-all duration-500
                        ${isHovered ? 'scale-110 opacity-100' : 'scale-100'}
                      `} />
                      
                      <div className="relative">
                        {member.image && !hasImageError ? (
                          <img
                            src={`${BASE_URL}/storage/${member.image}`}
                            alt={member.name}
                            className="w-36 h-36 object-cover rounded-full border-4 border-neutral-800 shadow-2xl relative z-10"
                            onError={() => handleImageError(member.id)}
                          />
                        ) : (
                          <div className={`
                            w-36 h-36 rounded-full 
                            bg-gradient-to-br from-yellow-500 to-red-800
                            flex items-center justify-center border-4 border-neutral-800
                            relative z-10
                          `}>
                            <User className="w-16 h-16 text-white" />
                          </div>
                        )}
                        
                        {/* Online Indicator */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-4 border-neutral-900 z-20"></div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                      {member.name}
                    </h3>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 rounded-full text-sm font-semibold mb-4 border border-neutral-700">
                      <Briefcase className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-200">{member.role}</span>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                      {member.awards?.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-neutral-300">{member.awards.length} Awards</span>
                        </div>
                      )}
                      {member.specializations?.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-neutral-300">{member.specializations.length} Specialties</span>
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="relative mb-6">
                      <p className="text-neutral-400 text-sm leading-relaxed text-center line-clamp-3">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  {/* Awards Display */}
                  {member.awards && member.awards.length > 0 && (
                    <div className="px-8 mb-6">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.awards.slice(0, 2).map((award, i) => (
                          <motion.div
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 rounded-full text-xs font-medium border border-neutral-700"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Award className="w-3 h-3 text-yellow-400" />
                            <span className="text-neutral-300 truncate max-w-[100px]">{award}</span>
                          </motion.div>
                        ))}
                        {member.awards.length > 2 && (
                          <span className="text-xs text-neutral-500">
                            +{member.awards.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="mt-auto px-8 pb-8">
                    <div className="flex items-center justify-center gap-3">
                      {member.social?.instagram && (
                        <motion.a
                          href={`https://instagram.com/${member.social.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-800 hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Instagram className="w-5 h-5" />
                        </motion.a>
                      )}
                      
                      {member.social?.email && (
                        <motion.a
                          href={`mailto:${member.social.email}`}
                          className="p-3 rounded-xl bg-neutral-800 border border-neutral-700 text-yellow-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-800 hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Mail className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Specialization Tags */}
                  {member.specializations && member.specializations.length > 0 && (
                    <motion.div 
                      className="absolute top-4 left-4 flex flex-col gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {member.specializations.slice(0, 2).map((spec, i) => (
                        <motion.div
                          key={i}
                          className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-500 to-red-800 text-white border border-white/10 shadow-lg flex items-center gap-1.5"
                          whileHover={{ scale: 1.05, x: 5 }}
                        >
                          <span>⭐</span>
                          <span>{spec}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Enhanced Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-3xl 
                  bg-gradient-to-r from-yellow-500 via-red-700 to-red-900
                  opacity-0 group-hover:opacity-10 blur-xl 
                  transition-opacity duration-500 -z-10
                `} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section - Dark theme */}
        {stylists.length > 0 && (
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-red-800/5 rounded-3xl blur-3xl"></div>
              
              <div className="relative bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-3xl p-10 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">
                  Ready to Work With Our Experts?
                </h3>
                <p className="text-neutral-400 mb-8 text-lg">
                  Each of our stylists brings unique expertise to ensure you get the perfect look. 
                  Book a consultation to discuss your vision with the right artist for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    href="/booking"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-2xl transition-all overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <User className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Book Consultation</span>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+2348051460844"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-yellow-500/30 text-yellow-200 hover:bg-yellow-500 hover:text-neutral-900 font-semibold text-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Team;