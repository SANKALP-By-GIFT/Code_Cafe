import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className="w-full px-6 md:px-10 py-4 shadow-md relative"
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E9C46A",
      }}
    >
      <div className="flex items-center justify-between">

        {/* Logo */}
        <h1
          className="text-xl font-bold cursor-pointer"
          style={{ color: "#3D5A80" }}
          onClick={() => navigate("/dashboard")}
        >
          EduPlatform
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/plans"
            className="font-medium hover:opacity-80 transition"
            style={{ color: "#2B2D42" }}
          >
            Courses
          </Link>

          <Link
            to="/dashboard"
            className="font-medium hover:opacity-80 transition"
            style={{ color: "#2B2D42" }}
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            className="font-medium hover:opacity-80 transition"
            style={{ color: "#2B2D42" }}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="font-medium hover:opacity-80 transition"
            style={{ color: "#2B2D42" }}
          >
            Contact
          </Link>

          <button
            onClick={handleLogout}
            className="
              px-5 py-2 rounded-lg text-white font-semibold
              transition-all duration-300
              shadow-md hover:shadow-lg
              hover:scale-105 active:scale-95
            "
            style={{
              background:
                "linear-gradient(135deg, #3D5A80, #2A9D8F)",
            }}
          >
            Logout
          </button>

        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl"
          style={{ color: "#3D5A80" }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            md:hidden mt-4 rounded-xl shadow-lg p-6
            flex flex-col gap-5 animate-fadeIn
          "
          style={{ backgroundColor: "#F4F1EC" }}
        >

          <Link
            to="/plans"
            onClick={() => setMenuOpen(false)}
            style={{ color: "#2B2D42" }}
            className="font-medium"
          >
            Courses
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            style={{ color: "#2B2D42" }}
            className="font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            style={{ color: "#2B2D42" }}
            className="font-medium"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            style={{ color: "#2B2D42" }}
            className="font-medium"
          >
            Contact
          </Link>

          <button
            onClick={handleLogout}
            className="
              mt-2 py-2 rounded-lg text-white font-semibold
              shadow-md hover:shadow-lg
              transition-all
            "
            style={{
              background:
                "linear-gradient(135deg, #3D5A80, #2A9D8F)",
            }}
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
