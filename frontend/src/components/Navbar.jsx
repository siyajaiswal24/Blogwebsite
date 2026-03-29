import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme(); // ✅ removed theme
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dropdownOpen]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const linkStyle = (path) =>
    pathname === path
      ? "text-luxAccent dark:text-luxAccent"
      : "text-luxMuted dark:text-darkMuted hover:text-luxHeading dark:hover:text-darkHeading transition";

  return (
    <nav className="sticky top-0 z-40 bg-luxSurface/95 dark:bg-darkSurface/95 border-b border-luxBorder dark:border-darkBorder backdrop-blur-sm shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          <span className="text-luxAccent">Story</span>Hub
        </h1>

        <div className="flex gap-8 text-sm items-center relative">

          <Link to="/" className={linkStyle("/")}>Home</Link>

          {user && (
            <Link to="/create" className={linkStyle("/create")}>Write</Link>
          )}

          <button onClick={toggleTheme}>
            {isDark ? "🌙" : "☀️"}
          </button>

          {!user && (
            <>
              <Link to="/login" className={linkStyle("/login")}>Sign In</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}

          {user && (
            <button onClick={logout}>{user.name}</button>
          )}

        </div>
      </div>
    </nav>
  );
}