import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";


export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🔁 Sync auth state on route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setDropdownOpen(false); // 🔴 IMPORTANT: close dropdown on navigation
  }, [pathname]);

  // Close dropdown on Escape
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
    <nav className="sticky top-0 z-40 bg-luxSurface/95 dark:bg-darkSurface/95 border-b border-luxBorder dark:border-darkBorder backdrop-blur-sm shadow-sm transition-colors duration-300" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <h1 className="text-2xl font-bold tracking-tight text-luxHeading dark:text-darkHeading transition-colors" aria-label="StoryHub Home">
          <span className="text-luxAccent dark:text-luxAccent">Story</span>Hub
        </h1>

        {/* NAV LINKS */}
        <div className="flex gap-8 text-sm items-center relative">

          <Link to="/" className={linkStyle("/")}> 
            Home
          </Link>

          {/* WRITE — only if logged in */}
          {user && (
            <Link to="/create" className={linkStyle("/create")}> 
              Write
            </Link>
          )}

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-luxBorder dark:bg-darkBorder rounded-full p-1 transition-colors duration-300 hover:bg-luxMuted dark:hover:bg-darkMuted focus:outline-none focus:ring-2 focus:ring-luxAccent dark:focus:ring-luxAccent"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {/* Toggle Slider */}
            <div className={`absolute top-1 w-5 h-5 bg-white dark:bg-darkHeading rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
              isDark ? 'translate-x-7' : 'translate-x-0'
            }`}>
              {/* Sun Icon */}
              <svg
                className={`absolute w-3 h-3 text-yellow-500 transition-opacity duration-300 ${
                  isDark ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              {/* Moon Icon */}
              <svg
                className={`absolute w-3 h-3 text-indigo-600 transition-opacity duration-300 ${
                  isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
          </button>

          {/* GUEST ACTIONS */}
          {!user && (
            <>
              <Link to="/login" className={linkStyle("/login")}> 
                Sign In
              </Link>

              <Link
                to="/register"
                className="
                  px-5 py-2 rounded-lg
                  bg-luxAccent dark:bg-luxAccent text-white dark:text-white
                  font-semibold
                  hover:bg-luxAccentHover dark:hover:bg-luxAccentHover
                  transition
                  shadow-md hover:shadow-lg
                "
              >
                Sign Up
              </Link>
            </>
          )}

          {/* USER DROPDOWN */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="
                  px-4 py-2 rounded-lg
                  bg-luxAccent dark:bg-luxAccent text-white dark:text-white
                  font-semibold
                  hover:bg-luxAccentHover dark:hover:bg-luxAccentHover
                  transition
                  shadow-md
                "
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-controls="user-menu"
                tabIndex={0}
              >
                {user.name}
              </button>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  id="user-menu"
                  role="menu"
                  aria-label="User menu"
                  className="
                    absolute right-0 mt-2 w-48
                    bg-luxSurface dark:bg-darkSurface border border-luxBorder dark:border-darkBorder
                    rounded-lg shadow-xl
                    p-3 flex flex-col gap-2
                    z-50 pointer-events-auto
                    transition-colors duration-300
                  "
                >
                  <span className="text-sm text-luxHeading dark:text-darkHeading font-semibold px-3 py-2">
                    {user.name}
                  </span>
                  <span className="text-xs text-luxMuted dark:text-darkMuted px-3">
                    {user.email}
                  </span>

                  <hr className="my-1 border-luxBorder dark:border-darkBorder" />

                  <Link
                    to="/profile"
                    className="text-sm text-luxAccent dark:text-luxAccent hover:bg-luxBg dark:hover:bg-darkBg px-3 py-2 rounded transition"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/my-blogs"
                    className="text-sm text-luxAccent dark:text-luxAccent hover:bg-luxBg dark:hover:bg-darkBg px-3 py-2 rounded transition"
                    role="menuitem"
                    tabIndex={0}
                  >
                    My Blogs
                  </Link>

                  <Link
                    to="/update-password"
                    className="text-sm text-luxAccent dark:text-luxAccent hover:bg-luxBg dark:hover:bg-darkBg px-3 py-2 rounded transition"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Update Password
                  </Link>

                  <hr className="my-1 border-luxBorder dark:border-darkBorder" />

                  <button
                    onClick={logout}
                    className="text-sm text-luxDanger dark:text-luxDanger hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded text-left transition"
                    role="menuitem"
                    tabIndex={0}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
