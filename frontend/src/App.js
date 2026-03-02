

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/UpdatePassword";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Accessibility: Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-2 left-2 bg-luxAccent text-white dark:text-darkBg px-4 py-2 rounded z-50"
          tabIndex={0}
        >
          Skip to main content
        </a>
        {/* 🌿 GLOBAL THEME WRAPPER */}
        <div className="min-h-screen bg-luxBg dark:bg-darkBg text-luxText dark:text-darkText transition-colors duration-300">
          <Navbar />
          <main id="main-content">
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🔐 PROTECTED ROUTES */}
              <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path="/my-blogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
              <Route path="/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

