import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const navigate = useNavigate();

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
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
      </div>

      <motion.div variants={itemVariants}>
        <motion.div
          className="relative mb-8"
          animate={{ 
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <AlertCircle className="w-32 h-32 text-red-500 mx-auto" />
          <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20"></div>
        </motion.div>
      </motion.div>

      <motion.h1 
        className="text-8xl sm:text-9xl font-black text-red-500 mb-4 drop-shadow-2xl"
        variants={itemVariants}
      >
        404
      </motion.h1>

      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6"
        variants={itemVariants}
      >
        Page Not Found
      </motion.h2>

      <motion.p 
        className="max-w-md text-yellow-200 text-lg mb-12 leading-relaxed"
        variants={itemVariants}
      >
        The page you are looking for doesn't exist or has been moved to a different location.
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        variants={itemVariants}
      >
        <motion.button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-800 border border-yellow-500/30 text-yellow-200 font-semibold hover:bg-neutral-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </motion.button>

        <Link to="/">
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5" />
            Return Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Additional Help */}
      <motion.div 
        className="mt-12 text-yellow-200/60 text-sm"
        variants={itemVariants}
      >
        <p>Need help? <a href="mailto:info@precioushairmpire.com" className="underline hover:text-yellow-300">Contact our support</a></p>
      </motion.div>
    </motion.section>
  );
}