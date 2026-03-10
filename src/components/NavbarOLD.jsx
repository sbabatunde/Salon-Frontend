import logo from "../../src/assets/precious-hairmpire/logo.jpg";
import { Menu, X, Scissors, Phone } from "lucide-react";
import { navItems } from "../constants/index.jsx";
import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from '../components/Auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setMobileDrawerOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 py-3 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-900/95 backdrop-blur-lg shadow-lg border-b border-yellow-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <motion.a 
            href="/" 
            className="flex items-center flex-shrink-0 group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              className="h-12 w-12 mr-3 rounded-full shadow-lg border-2 border-yellow-400 group-hover:border-yellow-300 transition"
              src={logo} 
              alt="logo" 
              whileHover={{ rotate: 5 }}
            />
            <div>
              <span className="text-xl font-extrabold tracking-tight text-yellow-100 drop-shadow block">
                Precious Hairmpire
              </span>
              <span className="text-xs text-yellow-200/80 font-medium block -mt-1">
                Luxury Hair Salon
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex ml-14 space-x-8">
            {navItems.map((item, index) => (
              <motion.li key={index} variants={navVariants}>
                <RouterLink
                  to={item.to ? `/#${item.to}` : "/"}
                  className="relative text-yellow-50 hover:text-yellow-300 transition font-medium py-2 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-red-800 group-hover:w-full transition-all duration-300"></span>
                </RouterLink>
              </motion.li>
            ))}
          </ul>

          {/* Desktop CTA & Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone CTA */}
            <motion.a
              href="tel:+2348051460844"
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-400/30 rounded-lg text-yellow-200 hover:bg-yellow-500/20 transition group"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Call Us</span>
            </motion.a>

            {user ? (
              <div className="flex items-center space-x-3">
                {/* <RouterLink
                  to="/dashboard"
                  className="px-4 py-2 border border-yellow-300 text-yellow-100 rounded-lg hover:bg-yellow-900/30 transition font-medium"
                >
                  Dashboard
                </RouterLink> */}
                
                {user?.role === 'admin' && (
                  <RouterLink
                    to="/admin"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-lg hover:from-yellow-600 hover:to-red-900 transition font-medium"
                  >
                    Admin
                  </RouterLink>
                )}
                
                <motion.button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700 transition font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <RouterLink
                to="/booking"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow-lg hover:from-yellow-600 hover:to-red-900 transition group"
              >
                <Scissors className="w-4 h-4" />
                Book Now
              </RouterLink>
            )}
          </div>

          {/* Mobile Hamburger */}
          <motion.div className="lg:hidden flex items-center">
            <button
              onClick={toggleNavbar}
              className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white shadow-lg hover:from-yellow-600 hover:to-red-900 transition"
              whileTap={{ scale: 0.95 }}
            >
              {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed inset-0 z-40 bg-neutral-900/95 backdrop-blur-lg lg:hidden pt-20"
            >
              <div className="container px-6 py-8">
                <ul className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.li key={index}>
                      <RouterLink
                        to={item.to ? `/#${item.to}` : "/"}
                        className="block text-2xl font-semibold text-yellow-100 hover:text-yellow-300 transition py-3 border-b border-yellow-500/20"
                        onClick={() => setMobileDrawerOpen(false)}
                      >
                        {item.label}
                      </RouterLink>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 space-y-4">
                  {user ? (
                    <>
                      <RouterLink
                        to="/dashboard"
                        className="block w-full text-center py-4 border-2 border-yellow-400 text-yellow-100 rounded-xl hover:bg-yellow-400/10 transition font-semibold text-lg"
                        onClick={() => setMobileDrawerOpen(false)}
                      >
                        Dashboard
                      </RouterLink>
                      
                      {user?.role === 'admin' && (
                        <RouterLink
                          to="/admin"
                          className="block w-full text-center py-4 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-xl font-semibold text-lg"
                          onClick={() => setMobileDrawerOpen(false)}
                        >
                          Admin Panel
                        </RouterLink>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-center py-4 bg-neutral-800 text-neutral-300 rounded-xl hover:bg-neutral-700 transition font-semibold text-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <RouterLink
                      to="/booking"
                      className="block w-full text-center py-4 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-xl font-semibold text-lg shadow-lg"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      Book Appointment
                    </RouterLink>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}