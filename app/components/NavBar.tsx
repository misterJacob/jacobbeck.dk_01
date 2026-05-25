import { Menu, X } from "lucide-react";
import React from "react";
import { ArrowUp, ChevronDown, Sparkles, Play } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router";
import { useState } from "react";

interface NavigationProps {
  scrolled: boolean;
}

export default function NavBar({ scrolled }: NavigationProps) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const showGoUpButton = scrolled && isHomePage;

  // console.log(location);
  // console.log(scrolled);
  // console.log(isHomePage);
  // console.log(showGoUpButton);
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className=" max-w-7x1 mx-auto px4 sm:px-6 lx:px-8">
        <div className=" flex justify-between items-center h-14 sm:h-16 md:h-20 ">
          <NavLink
            to="/"
            className="flex items-center space-x-1 group cursor-pointer"
          >
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-blue-500/50 flex items-center justify-center shadow-sm">
              <img
                className="w-full h-full object-contain"
                src="/logo.svg"
                alt="Logo"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-white">Jacob</span>
              <span className="text-blue-400">Beck</span>
            </span>
          </NavLink>
          <Link
            to="#top"
            className={`border-blue-200/80  transition-all duration-300 ${
              showGoUpButton ? "visible" : "hidden "
            } `}
          >
            <button className="group border-white-9 sm:w-auto px-4 sm:px- py-1 sm:py-4 bg-gradient-to-b from-blue-900/20 to-blue-800/2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-1">
              <span className="text">Back to Top</span>
              <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
          {/* nav links */}

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLink
              to="/about"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              About Me
            </NavLink>
            <NavLink
              to="/portfolio"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/contact"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Contact
            </NavLink>
          </div>

          <button
            className="md:hidden p-2 text-grey-300 hover-text-white "
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileMenuIsOpen && (
        <div className="mobileWrapper md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300 ">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <NavLink
              to="/about"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base"
            >
              About Me
            </NavLink>
            <NavLink
              to="/portfolio"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base"
            >
              Portfolio
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-base"
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
