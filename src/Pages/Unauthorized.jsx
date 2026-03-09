import { Lock, Shield, Home, LogIn, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Unauthorized() {
  const navigate = useNavigate();
  const buttonsRef = useRef(null);

  // Force re-attach click handlers after animation
  useEffect(() => {
    // Ensure buttons are clickable after animations
    const timer = setTimeout(() => {
      if (buttonsRef.current) {
        buttonsRef.current.style.pointerEvents = 'auto';
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background - moved to back */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ zIndex: 0 }}>
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

      {/* Main Content - with higher z-index */}
      <motion.div variants={itemVariants} className="relative z-10" style={{ pointerEvents: 'none' }}>
        <motion.div
          className="relative mb-8"
          variants={floatingVariants}
          animate="float"
          style={{ pointerEvents: 'none' }}
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
        className="text-8xl sm:text-9xl font-black text-yellow-500 mb-4 drop-shadow-2xl relative z-10"
        variants={itemVariants}
        style={{ pointerEvents: 'none' }}
      >
        401
      </motion.h1>

      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6 relative z-10"
        variants={itemVariants}
        style={{ pointerEvents: 'none' }}
      >
        Unauthorized Access
      </motion.h2>

      <motion.p 
        className="max-w-md text-yellow-200 text-lg mb-12 leading-relaxed relative z-10"
        variants={itemVariants}
        style={{ pointerEvents: 'none' }}
      >
        You don't have permission to access this page. Please login with appropriate credentials or contact support if you believe this is an error.
      </motion.p>

      {/* Buttons Container - with explicit pointer-events: auto */}
      <motion.div 
        ref={buttonsRef}
        className="flex flex-col sm:flex-row gap-4 mb-12 relative z-20"
        variants={itemVariants}
        style={{ pointerEvents: 'auto' }}
      >
        <Link to="/login" style={{ pointerEvents: 'auto' }}>
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow-2xl hover:from-yellow-600 hover:to-red-900 transition-all group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}
          >
            <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go to Login
          </motion.button>
        </Link>

        <motion.button
          onClick={handleGoBack}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neutral-800 border border-yellow-500/30 text-yellow-200 font-semibold hover:bg-neutral-700 transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </motion.button>

        <Link to="/" style={{ pointerEvents: 'auto' }}>
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neutral-800 border border-yellow-500/30 text-yellow-200 font-semibold hover:bg-neutral-700 transition-all group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Return Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Security Notice */}
      <motion.div 
        className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 max-w-md relative z-10"
        variants={itemVariants}
        style={{ pointerEvents: 'none' }}
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
        className="mt-8 text-yellow-200/60 text-sm relative z-10"
        variants={itemVariants}
        style={{ pointerEvents: 'none' }}
      >
        <p>
          Need help?{" "}
          <a 
            href="mailto:support@precioushairmpire.com" 
            className="underline hover:text-yellow-300 transition-colors"
            style={{ pointerEvents: 'auto', position: 'relative', zIndex: 30 }}
          >
            Contact our support team
          </a>
        </p>
      </motion.div>
    </motion.section>
  );
}