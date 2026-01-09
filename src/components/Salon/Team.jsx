import { User, Award, Instagram, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Team data - you can replace this with API data
const team = [
  {
    name: "Amara Johnson",
    role: "Lead Bridal Stylist",
    image: "/images/team1.jpg",
    bio: "With over 10 years of experience, Amara specializes in timeless bridal looks and creative updos that last all night.",
    awards: ["Certified Master Stylist", "Bridal Beauty Award 2023"],
    social: { instagram: "@amara_styles", email: "amara@precioushairmpire.com" }
  },
  {
    name: "Lola Smith",
    role: "Color Specialist",
    image: "/images/team2.jpg",
    bio: "Lola brings color to life with her expertise in balayage, highlights, and vibrant transformations that turn heads.",
    awards: ["Color Genius 2022", "Trendsetter Award"],
    social: { instagram: "@lola_colors", email: "lola@precioushairmpire.com" }
  },
  {
    name: "Chinwe Okafor",
    role: "Extension Expert",
    image: "/images/team3.jpg",
    bio: "Chinwe creates seamless, natural extensions for every hair type, ensuring comfort and confidence that lasts.",
    awards: ["Extension Specialist", "Client Choice 2023"],
    social: { instagram: "@chinwe_extensions", email: "chinwe@precioushairmpire.com" }
  }
];

function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="team" className="py-20 bg-neutral-950">
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
            <User className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Meet the Artists
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Master Stylists
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Our talented team of certified stylists brings passion, expertise, and creativity to every transformation. 
            Get to know the artists who will make your beauty dreams a reality.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative"
              onMouseEnter={() => setSelectedMember(index)}
              onMouseLeave={() => setSelectedMember(null)}
            >
              <div className="bg-neutral-900 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-500 group-hover:shadow-yellow-500/10 h-full">
                
                {/* Profile Image */}
                <motion.div 
                  className="relative mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-yellow-400 shadow-2xl"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-red-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Online Indicator */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900"></div>
                </motion.div>

                {/* Member Info */}
                <h3 className="text-2xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                  {member.name}
                </h3>
                
                <span className="text-yellow-200 font-semibold mb-4 inline-block px-4 py-1 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                  {member.role}
                </span>

                <p className="text-neutral-300 leading-relaxed mb-6 flex-grow">
                  {member.bio}
                </p>

                {/* Awards */}
                {member.awards.length > 0 && (
                  <motion.div 
                    className="flex flex-wrap gap-2 justify-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {member.awards.map((award, i) => (
                      <motion.span
                        key={i}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-yellow-900/40 text-yellow-200 text-xs font-semibold border border-yellow-500/20"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Award className="w-3 h-3" />
                        {award}
                      </motion.span>
                    ))}
                  </motion.div>
                )}

                {/* Social Links */}
                <motion.div 
                  className="flex gap-4 mt-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.a
                    href={`https://instagram.com/${member.social.instagram}`}
                    className="p-2 bg-neutral-800 rounded-lg text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.a
                    href={`mailto:${member.social.email}`}
                    className="p-2 bg-neutral-800 rounded-lg text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </motion.div>

                {/* Specialization Tags */}
                <motion.div 
                  className="absolute top-4 left-4 flex flex-col gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {member.role.includes('Bridal') && (
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-bold border border-pink-500/30">
                      👑 Bridal
                    </span>
                  )}
                  {member.role.includes('Color') && (
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30">
                      🎨 Color
                    </span>
                  )}
                  {member.role.includes('Extension') && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30">
                      💫 Extensions
                    </span>
                  )}
                </motion.div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-500 to-red-800 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-yellow-500/10 to-red-800/10 border border-yellow-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">
              Ready to Work With Our Experts?
            </h3>
            <p className="text-neutral-300 mb-6">
              Each of our stylists brings unique expertise to ensure you get the perfect look. 
              Book a consultation to discuss your vision with the right artist for you.
            </p>
            <motion.a
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5" />
              Book Consultation
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Team;