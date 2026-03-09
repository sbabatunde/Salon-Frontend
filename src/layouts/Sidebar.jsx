import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../constants/admin";
import {
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Check if any child of a dropdown is active
  const isChildActive = (children) => {
    return children?.some(child => {
      const childPath = `/admin/${child.path}`;
      return location.pathname === childPath || location.pathname.startsWith(childPath + '/');
    });
  };

  // Initialize dropdowns - keep open if any child is active
  useEffect(() => {
    const initialDropdownState = {};
    
    sidebarLinks.forEach(item => {
      if (item.children) {
        // Keep dropdown open if any child is active
        initialDropdownState[item.label] = isChildActive(item.children);
      }
    });
    
    setOpenDropdowns(initialDropdownState);
  }, [location.pathname]); // Re-run when route changes

  const toggleDesktop = () => setDesktopOpen(!desktopOpen);

  const toggleDropdown = (label) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Don't close dropdown when clicking child items - they're links, so navigation happens
  // The dropdown will stay open because we check isChildActive in the useEffect

  const renderNavItems = (items, level = 0) => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdowns[item.label];
      const paddingLeft = level === 0 ? "pl-4" : `pl-${(level + 1) * 4}`;

      if (hasChildren) {
        const anyChildActive = isChildActive(item.children);
        
        return (
          <div key={item.label} className="relative">
            <button
              onClick={() => toggleDropdown(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all
                ${desktopOpen || mobileOpen ? paddingLeft : "justify-center px-2"}
                ${anyChildActive 
                  ? "bg-yellow-500/20 text-yellow-300" 
                  : "text-yellow-100/70 hover:bg-yellow-500/10 hover:text-yellow-300"
                }
                group relative
              `}
            >
              <span className="flex-shrink-0">
                {item.icon}
              </span>
              
              {(desktopOpen || mobileOpen) && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </>
              )}

              {!desktopOpen && !mobileOpen && (
                <span className="absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-md bg-yellow-700 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 pointer-events-none">
                  {item.label}
                </span>
              )}
            </button>

            {/* Dropdown Menu -始终保持打开如果任何子项是激活的 */}
            {(desktopOpen || mobileOpen) && isOpen && (
              <div className={`mt-1 space-y-1 ${level === 0 ? "ml-4" : "ml-2"}`}>
                {item.children.map((child) => {
                  const childPath = `/admin/${child.path}`;
                  const isActive = location.pathname === childPath || 
                                  location.pathname.startsWith(childPath + '/');

                  return (
                    <NavLink
                      key={child.path}
                      to={childPath}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                          ${desktopOpen || mobileOpen ? "pl-8" : "justify-center px-2"}
                          ${
                            (navIsActive || isActive)
                              ? "bg-yellow-500 text-neutral-900 shadow-lg"
                              : "text-yellow-100/70 hover:bg-yellow-500/10 hover:text-yellow-300"
                          }
                        `
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {(desktopOpen || mobileOpen) && (
                        <span>{child.label}</span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      }

      // Regular link (no children)
      const path = item.path ? `/admin/${item.path}` : '/admin';
      const isActive = location.pathname === path || 
                      (item.path === "" && location.pathname === "/admin");

      return (
        <NavLink
          key={item.path || item.label}
          to={path}
          end={item.path === ""}
          className={({ isActive: navIsActive }) =>
            `relative group flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all
              ${desktopOpen || mobileOpen ? paddingLeft : "justify-center px-2"}
              ${
                (navIsActive || isActive)
                  ? "bg-yellow-500 text-neutral-900 shadow-lg"
                  : "text-yellow-100/70 hover:bg-yellow-500/10 hover:text-yellow-300"
              }
            `
          }
          onClick={() => setMobileOpen(false)}
        >
          <span className="flex-shrink-0">
            {item.icon}
          </span>
          
          {(desktopOpen || mobileOpen) && (
            <span className="text-sm">{item.label}</span>
          )}

          {!desktopOpen && !mobileOpen && (
            <span
              className="absolute left-full top-1/2 ml-2 -translate-y-1/2 rounded-md bg-yellow-700 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg z-50 pointer-events-none"
              role="tooltip"
            >
              {item.label}
            </span>
          )}
        </NavLink>
      );
    });
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
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
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-neutral-900 to-neutral-950 border-r border-yellow-500/20 p-3 z-50
          transition-all duration-300 ease-in-out shadow-2xl
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:flex md:flex-col
          ${desktopOpen ? "md:w-64" : "md:w-16"}
        `}
        aria-label="Sidebar navigation"
      >
        {/* Header */}
        <div className={`flex items-center ${desktopOpen ? "justify-between" : "justify-center"} mb-6 pb-4 border-b border-yellow-500/20`}>
          {desktopOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-red-800 bg-clip-text text-transparent">
                Admin
              </span>
            </div>
          )}

          {!desktopOpen && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Mobile Close Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 transition-colors focus:outline-none"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Desktop Toggle Button */}
          <button
            onClick={toggleDesktop}
            className="hidden md:flex p-1.5 rounded-lg bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 transition-colors focus:outline-none"
            aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {desktopOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-500/20 scrollbar-track-transparent">
          <div className="space-y-1">
            {renderNavItems(sidebarLinks)}
          </div>
        </nav>

        {/* Footer */}
        {desktopOpen && (
          <div className="mt-auto pt-4 border-t border-yellow-500/20">
            <div className="px-4 py-2">
              <p className="text-xs text-yellow-100/40">
                v1.0.0
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}