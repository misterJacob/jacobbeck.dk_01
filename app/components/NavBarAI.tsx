import React, { useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import { NavLink } from "react-router";

interface NavigationProps {
  scrolled: boolean;
}

export default function NavBar({ scrolled }: NavigationProps) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  // Simple formatting function for active vs resting text highlights
  const linkStyles = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 text-sm lg:text-base font-medium ${
      isActive
        ? "text-blue-400 font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/60"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* BRAND LOGO */}
          <NavLink to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shadow-sm">
              <img
                className="w-full h-full object-contain p-1"
                src="/logo.svg"
                alt="Logo"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold">
              <span className="text-white">Jacob</span>
              <span className="text-blue-400">Beck</span>
            </span>
          </NavLink>

          {/* DESKTOP NAV INTEGRATION */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLink to="/about" className={linkStyles}>
              About Me
            </NavLink>
            <NavLink to="/contact" className={linkStyles}>
              Contact
            </NavLink>
            <NavLink to="/portfolio" className={linkStyles}>
              Portfolio
            </NavLink>
          </div>

          {/* MOBILE TOGGLE WIRE */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU PANEL */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/80">
          <div className="px-4 py-4 space-y-3">
            <NavLink
              to="/about"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base py-1.5 px-2 rounded-lg"
            >
              About Me
            </NavLink>
            <NavLink
              to="/portfolio"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base py-1.5 px-2 rounded-lg"
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base py-1.5 px-2 rounded-lg"
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
