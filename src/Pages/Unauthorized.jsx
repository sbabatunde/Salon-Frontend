import { Lock, Shield, Home, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Unauthorized() {
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

  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div variants={itemVariants} className="relative z-10">
        <motion.div
          className="relative mb-8"
          variants={floatingVariants}
          animate="float"
        >
          <div className="relative">
            <Lock className="w-32 h-32 text-yellow-500 mx-auto" />
            <motion.div
              className="absolute inset-0 bg-yellow-500 rounded-full blur-2xl opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Shield className="w-12 h-12 text-red-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.h1 
        className="text-8xl sm:text-9xl font-black text-yellow-500 mb-4 drop-shadow-2xl"
        variants={itemVariants}
      >
        401
      </motion.h1>

      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6"
        variants={itemVariants}
      >
        Unauthorized Access
      </motion.h2>

      <motion.p 
        className="max-w-md text-yellow-200 text-lg mb-12 leading-relaxed"
        variants={itemVariants}
      >
        You don't have permission to access this page. Please login with appropriate credentials or contact support if you believe this is an error.
      </motion.p>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mb-12"
        variants={itemVariants}
      >
        <Link to="/login">
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go to Login
          </motion.button>
        </Link>

        <motion.button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neutral-800 border border-yellow-500/30 text-yellow-200 font-semibold hover:bg-neutral-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Go Back
        </motion.button>

        <Link to="/">
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neutral-800 border border-yellow-500/30 text-yellow-200 font-semibold hover:bg-neutral-700 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Return Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Security Notice */}
      <motion.div 
        className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 max-w-md"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-yellow-300">Security Notice</h3>
        </div>
        <p className="text-yellow-200/80 text-sm">
          This area requires special permissions. If you need access, please contact the administrator or verify your login credentials.
        </p>
      </motion.div>

      {/* Support Link */}
      <motion.div 
        className="mt-8 text-yellow-200/60 text-sm"
        variants={itemVariants}
      >
        <p>
          Need help?{" "}
          <a 
            href="mailto:support@precioushairmpire.com" 
            className="underline hover:text-yellow-300 transition-colors"
          >
            Contact our support team
          </a>
        </p>
      </motion.div>
    </motion.section>
  );
}