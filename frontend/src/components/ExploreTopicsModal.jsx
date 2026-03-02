import { useEffect } from "react";

export default function ExploreTopicsModal({ open, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-colors"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          relative z-10
          bg-luxSurface dark:bg-darkSurface border border-luxBorder dark:border-darkBorder
          rounded-2xl p-8 w-full max-w-md
          shadow-2xl
          transition-colors
        "
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute top-4 right-4
            text-luxMuted dark:text-darkMuted hover:text-luxAccent dark:hover:text-luxAccent
            transition
          "
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-luxHeading dark:text-darkHeading transition-colors mb-2">
          Explore topics
        </h2>

        <p className="text-sm text-luxMuted dark:text-darkMuted transition-colors mb-8">
          Choose how you want to explore new ideas.
        </p>

        <div className="space-y-5">

          {/* ASK GOOGLE */}
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              block w-full text-center
              border-2 border-luxAccent dark:border-luxAccent
              text-luxAccent dark:text-luxAccent
              rounded-xl py-3
              font-medium
              transition-all duration-200
              hover:bg-luxAccent hover:text-white
              hover:-translate-y-[1px]
              hover:shadow-lg hover:shadow-emerald-500/20
            "
          >
            Ask Google
          </a>

          {/* DISCUSS WITH AI */}
          <a
            href="https://chat.openai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="
              block w-full text-center
              border-2 border-luxAccent dark:border-luxAccent
              text-luxAccent dark:text-luxAccent
              rounded-xl py-3
              font-medium
              transition-all duration-200
              hover:bg-luxAccent hover:text-white
              hover:-translate-y-[1px]
              hover:shadow-lg hover:shadow-emerald-500/20
            "
          >
            Discuss with AI
          </a>

        </div>
      </div>
    </div>
  );
}
