import { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  darkMode: boolean;
  transitioning: boolean;
}

export default function Navbar({ darkMode, transitioning }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`px-8 py-4 transition-opacity duration-200 ${
        transitioning ? "opacity-0" : "opacity-100"
      } ${
        darkMode
          ? "bg-zinc-900 text-white"
          : "bg-white text-zinc-900 shadow-sm"
      }`}
    >
      {/* TOP ROW */}
      <div className="flex justify-between items-center">
        
        {/* Logo / Name */}
        <Link to="/" className="text-xl font-bold">
          Silic Ivica
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition-colors duration-300 ${
                darkMode
                  ? "hover:text-indigo-400"
                  : "hover:text-orange-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              darkMode ? "bg-white" : "bg-zinc-900"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              darkMode ? "bg-white" : "bg-zinc-900"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              darkMode ? "bg-white" : "bg-zinc-900"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 mt-4" : "max-h-0"
        }`}
      >
        <div
          className={`flex flex-col gap-4 pb-4 border-t pt-4 ${
            darkMode ? "border-zinc-700" : "border-zinc-200"
          }`}
        >
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`text-lg font-semibold transition-colors duration-300 ${
                darkMode
                  ? "hover:text-indigo-400"
                  : "hover:text-orange-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}