/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Modern blue-white palette
        luxBg: "#f8fafc",           // Light background
        luxSurface: "#ffffff",      // White cards
        luxBorder: "#e2e8f0",       // Light border
        luxHeading: "#0f172a",      // Dark heading
        luxText: "#475569",         // Medium text
        luxMuted: "#94a3b8",        // Muted text
        luxAccent: "#3b82f6",       // Vibrant blue
        luxAccentHover: "#2563eb",  // Darker blue
        luxSecondary: "#8b5cf6",    // Purple accent
        luxSuccess: "#10b981",      // Green success
        luxDanger: "#ef4444",       // Red danger
        
        // Dark mode colors
        darkBg: "#0f172a",          // Dark background
        darkSurface: "#1e293b",     // Dark cards
        darkBorder: "#334155",      // Dark border
        darkHeading: "#f1f5f9",     // Light heading
        darkText: "#cbd5e1",        // Light text
        darkMuted: "#64748b",       // Muted text in dark
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        spinSlow: "spin 3s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};