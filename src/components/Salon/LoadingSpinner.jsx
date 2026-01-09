import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-yellow-200 text-lg">Please wait...</p>
      </div>
    </div>
  );
}