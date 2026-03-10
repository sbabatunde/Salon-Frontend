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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location]);

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

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 py-3 transition-all duration-300 ${
      scrolled 
        ? 'bg-neutral-900/95 backdrop-blur-lg shadow-lg border-b border-yellow-500/20' 
        : 'bg-transparent'
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img 
              className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-yellow-400" 
              src={logo} 
              alt="logo" 
            />
            <div className="hidden sm:block">
              <span className="text-sm md:text-xl font-bold text-yellow-100">Precious Hairmpire</span>
              <span className="text-[10px] md:text-xs text-yellow-200/80 block">Luxury Hair Salon</span>
            </div>
          </a>

          {/* Desktop Menu - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <RouterLink
                key={index}
                to={item.to ? `/#${item.to}` : "/"}
                className="text-yellow-50 hover:text-yellow-300 transition font-medium"
              >
                {item.label}
              </RouterLink>
            ))}
          </div>

          {/* Desktop Actions - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:+2348051460844"
              className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-400/30 rounded-lg text-yellow-200"
            >
              <Phone size={16} />
              <span className="text-sm">Call</span>
            </a>

            {user ? (
              <>
                {user?.role === 'admin' && (
                  <RouterLink
                    to="/admin"
                    className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-lg text-sm font-medium"
                  >
                    Admin
                  </RouterLink>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <RouterLink
                to="/booking"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-lg text-sm font-medium"
              >
                <Scissors size={16} />
                Book Now
              </RouterLink>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            onClick={toggleNavbar}
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white"
          >
            {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Simple dropdown */}
      {mobileDrawerOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-900 border-t border-yellow-500/20 shadow-xl">
          <div className="container px-4 py-4 mx-auto">
            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-4">
              {navItems.map((item, index) => (
                <RouterLink
                  key={index}
                  to={item.to ? `/#${item.to}` : "/"}
                  className="block py-3 px-4 text-yellow-100 hover:bg-yellow-500/10 rounded-lg transition"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  {item.label}
                </RouterLink>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-2 pt-4 border-t border-yellow-500/20">
              <a
                href="tel:+2348051460844"
                className="flex items-center gap-3 py-3 px-4 text-yellow-200 hover:bg-yellow-500/10 rounded-lg transition"
                onClick={() => setMobileDrawerOpen(false)}
              >
                <Phone size={18} />
                <span>Call Us: +234 805 146 0844</span>
              </a>

              {user ? (
                <>
                  {user?.role === 'admin' && (
                    <RouterLink
                      to="/admin"
                      className="block py-3 px-4 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-lg text-center font-medium"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      Admin Panel
                    </RouterLink>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 px-4 bg-neutral-800 text-neutral-300 rounded-lg text-center font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <RouterLink
                  to="/booking"
                  className="block py-3 px-4 bg-gradient-to-r from-yellow-500 to-red-800 text-white rounded-lg text-center font-medium"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  Book Appointment
                </RouterLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}