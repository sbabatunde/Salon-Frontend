import { Heart, Sparkles, Users, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function About() {
  const [hoveredStat, setHoveredStat] = useState(null);

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients", color: "from-yellow-400 to-yellow-600" },
    { icon: Award, value: "50+", label: "Bridal Styles", color: "from-red-500 to-red-700" },
    { icon: Clock, value: "3+", label: "Years Experience", color: "from-yellow-500 to-red-800" },
    { icon: Heart, value: "100%", label: "Satisfaction", color: "from-pink-500 to-red-600" }
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
    <section id="about" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart className="w-8 h-8 text-yellow-400" />
              <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
                Our Story
              </span>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              Where{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
                Beauty Meets
              </span>{" "}
              Artistry
            </motion.h2>

            <motion.div 
              className="space-y-4 text-lg text-neutral-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>
                Founded on a profound love for beauty and an unwavering dedication to empowering women, 
                <strong className="text-yellow-300"> Precious Hairmpire </strong> 
                is more than a salon—it's a sanctuary where confidence is crafted and dreams come to life.
              </p>
              
              <p>
                Every style we create is a collaborative masterpiece, every client a cherished muse. 
                From the electric excitement of bridal mornings to the quiet confidence of everyday transformations, 
                we pour our heart, soul, and expertise into every single detail.
              </p>

              <p>
                Our mission is simple yet profound: to ensure you leave our doors feeling not just beautiful, 
                but truly <em className="text-yellow-200">radiant, celebrated, and empowered</em>.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/booking"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-2xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5" />
                Begin Your Journey
              </motion.a>

              <motion.a
                href="#team"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-yellow-400 text-yellow-200 hover:bg-yellow-400 hover:text-neutral-900 font-semibold text-lg transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Meet Our Artists
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={`bg-neutral-900 rounded-2xl p-6 text-center border-2 border-transparent transition-all duration-500 ${
                  hoveredStat === index 
                    ? 'border-yellow-500/50 shadow-2xl shadow-yellow-500/20 transform scale-105' 
                    : 'hover:border-yellow-500/30'
                }`}>
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-red-800/10 mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-8 h-8 text-yellow-400" />
                  </motion.div>

                  {/* Value */}
                  <motion.div 
                    className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <div className="text-neutral-300 font-semibold text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          className="mt-20 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-8 py-6"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-yellow-300 mb-4">
              Our Philosophy
            </h3>
            <p className="text-lg text-neutral-300 leading-relaxed">
              "We believe that every woman deserves to feel like the best version of herself. 
              Our artistry goes beyond hair—it's about unlocking confidence, celebrating individuality, 
              and creating moments that become cherished memories."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;