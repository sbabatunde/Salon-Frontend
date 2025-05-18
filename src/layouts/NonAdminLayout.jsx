import { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../constants/admin";
import {
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const toggleDesktop = () => setDesktopOpen(!desktopOpen);

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-yellow-600 text-neutral-900 shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-7 h-7" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full md:min-h-screen bg-gradient-to-b from-yellow-600 to-yellow-800 p-2 z-50
          transition-transform duration-300 ease-in-out shadow-lg
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"}
          md:static md:translate-x-0 md:flex md:flex-col
          ${desktopOpen ? "md:w-64" : "md:w-20"}
        `}
        aria-label="Sidebar navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-white select-none">
            <User className="w-6 h-6" />
            {desktopOpen && <span className="text-2xl font-extrabold tracking-wide">Admin</span>}
          </div>

          {/* Mobile Close Button */}
          <button
            className="md:hidden p-2 rounded-full bg-yellow-700 text-yellow-100 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={toggleDesktop}
            className="hidden md:inline-flex p-2 rounded-full text-yellow-100 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {desktopOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3" role="menu">
          {sidebarLinks.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={`/admin${path ? "/" + path : ""}`}
              end={path === ""}
              role="menuitem"
              className={({ isActive }) =>
                `relative group flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-colors
                ${
                  isActive
                    ? "bg-yellow-400 text-neutral-900 shadow-lg"
                    : "text-yellow-100 hover:bg-yellow-500 hover:text-neutral-900"
                }
                `
              }
              onClick={() => setMobileOpen(false)} // close sidebar on mobile after click
              tabIndex={mobileOpen || desktopOpen ? 0 : -1}
            >
              <span className="w-6 h-6 flex-shrink-0 text-inherit">{icon}</span>
              {(desktopOpen || mobileOpen) && (
                <span className="whitespace-nowrap">{label}</span>
              )}

              {/* Tooltip for collapsed desktop */}
              {!desktopOpen && !mobileOpen && (
                <span
                  className="absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-md bg-yellow-700 px-2 py-1 text-sm font-medium text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 pointer-events-none select-none"
                  role="tooltip"
                >
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
