import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="px-4 py-1 bg-white text-zinc-900 shadow-sm flex flex-col w-full">

      <div className="flex justify-between items-center py-3 w-full">

        <Link to="/" className="text-xl font-bold">
          Silic Ivica
        </Link>

        <div className="hidden md:flex gap-6">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="transition-colors duration-300 hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-zinc-900 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 mt-4" : "max-h-0"}`}>
        <div className="flex flex-col gap-4 pb-4 border-t border-zinc-200 pt-4">
          {links.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-lg font-semibold transition-colors duration-300 hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

    </nav>
  );
}