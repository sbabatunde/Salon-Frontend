import logo from "../../src/assets/precious-hairmpire/logo.jpg";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants/index.jsx";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from '../components/Auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);

  // Logout handler
  const handleLogout = async () => {
    try {
      await logout();
      setMobileDrawerOpen(false);  // close mobile menu if open
      navigate('/login');          // redirect to login page after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 py-3 pl-12 bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800/60">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex justify-between items-center">
            {/* Logo and Brand */}
            <a href="/" className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2 rounded-full shadow" src={logo} alt="logo" />
              <span className="text-xl font-extrabold tracking-tight text-yellow-100 drop-shadow">
                Precious Hairmpire
              </span>
            </a>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex ml-14 space-x-10">
              {navItems.map((item, index) => (
                <li key={index}>
                  <RouterLink
                    to={item.to ? `/#${item.to}` : "/"}
                    className="cursor-pointer text-yellow-50 hover:text-yellow-400 transition font-medium"
                  >
                    {item.label}
                  </RouterLink>
                </li>
              ))}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="#contact"
                className="py-2 px-4 border border-yellow-300 text-yellow-100 rounded-md hover:bg-yellow-900/30 transition"
              >
                Contact Us
              </a>

              <RouterLink
                to="/booking"
                className="py-3 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition text-center"
              >
                Book Appointment
              </RouterLink>

              {/* Show Admin link only for admin users */}
              {user?.role === 'admin' && (
                <RouterLink
                  to="/admin"
                  className="py-2 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition"
                >
                  Admin
                </RouterLink>
              )}

              {/* Logout button if logged in */}
              {user && (
                <button
                  onClick={handleLogout}
                  className="py-2 px-4 rounded-md bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                >
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleNavbar}
                className="p-2 rounded-md bg-yellow-600 text-neutral-900 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 z-50 relative"
                aria-label="Toggle menu"
              >
                {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul className="space-y-3 w-full text-center">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <RouterLink
                      to={item.to ? `/#${item.to}` : "/"}
                      className="cursor-pointer text-yellow-50 hover:text-yellow-400 transition font-medium text-xl"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      {item.label}
                    </RouterLink>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col space-y-6 mt-3 w-3/4 text-center">
                <a
                  href="#contact"
                  className="py-3 px-4 border border-yellow-300 text-yellow-100 rounded-md hover:bg-yellow-900/30 transition"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  Contact Us
                </a>

                <RouterLink
                  to="/booking"
                  className="py-3 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition"
                  onClick={() => setMobileDrawerOpen(false)}
                >
                  Book Appointment
                </RouterLink>

                {/* Admin link for admins */}
                {user?.role === 'admin' && (
                  <RouterLink
                    to="/admin"
                    className="py-3 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition"
                    onClick={() => setMobileDrawerOpen(false)}
                  >
                    Admin
                  </RouterLink>
                )}

                {/* Logout button if logged in */}
                {user && (
                  <button
                    onClick={handleLogout}
                    className="py-3 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800  text-white font-semibold shadow hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
