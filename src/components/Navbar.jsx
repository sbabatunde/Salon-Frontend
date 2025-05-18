import logo from "../../src/assets/precious-hairmpire/logo.jpg";
import { Menu, X } from "lucide-react";
import { navItems } from "../constants/index.jsx";
import { useState } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);

  return (
    <>
      <nav className="sticky top-0 z-40 py-3  pl-12 bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800/60">
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
                  {/* <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-80} // Adjust for navbar height
                    duration={500}
                    activeClass="text-yellow-400"
                    className="cursor-pointer text-yellow-50 hover:text-yellow-400 transition font-medium"
                  >
                    {item.label}
                  </Link> */}

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
              <a
                href="#booking"
                className="py-2 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition"
              >
                Book Appointment
              </a>
              <a
                href="/admin"
                className="py-2 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition"
              >
                Admin
              </a>
            </div>
            {/* Mobile Hamburger */}
            {/* <div className="lg:hidden md:flex flex-col justify-end">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div> */}
            {/* Mobile Hamburger inside Navbar */}
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
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {/* <Link
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      activeClass="text-yellow-400"
                      className="cursor-pointer text-xl text-yellow-50 hover:text-yellow-400 transition font-semibold"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      {item.label}
                    </Link> */}
                    <RouterLink
                      to={item.to ? `/#${item.to}` : "/"}
                      className="cursor-pointer text-yellow-50 hover:text-yellow-400 transition font-medium"
                    >
                      {item.label}
                    </RouterLink>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-6 mt-3 w-3/4">
                <a
                  href="#contact"
                  className="py-3 px-4 border border-yellow-300 text-yellow-100 rounded-md hover:bg-yellow-900/30 transition text-center"
                >
                  Contact Us
                </a>
                <a
                  href="#booking"
                  className="py-3 px-4 rounded-md bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold shadow hover:from-yellow-600 hover:to-red-900 transition text-center"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
