import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a profile picture");

    setLoading(true);

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch("http://localhost:5050/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}` // if using JWT
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile picture updated!");
        localStorage.setItem("user", JSON.stringify(data)); // update localStorage
        setUser(data);
      } else {
        alert(data.message || "Failed to update profile picture");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      alert("Network error, check backend!");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  if (!user) return null; // prevent rendering before user loads

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-luxBg dark:bg-darkBg transition-colors animate-fadeIn">
      <div className="w-full max-w-md bg-luxSurface dark:bg-darkSurface border border-luxBorder dark:border-darkBorder rounded-xl p-10 space-y-6 shadow-xl shadow-black/40 dark:shadow-luxAccent/10 transition-colors">
        <h2 className="text-2xl font-semibold text-luxHeading dark:text-darkHeading transition-colors">Profile</h2>

        <div className="flex flex-col items-center gap-3">
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-luxBorder dark:border-darkBorder transition-colors"
          />
          <span className="text-lg font-medium text-luxHeading dark:text-darkHeading transition-colors">{user.name}</span>
          <span className="text-sm text-luxMuted dark:text-darkMuted transition-colors">{user.email}</span>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm text-luxMuted dark:text-darkMuted transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md font-medium transition ${
              loading
                ? "bg-luxAccent/50 cursor-not-allowed text-white"
                : "bg-luxAccent text-white hover:bg-luxAccentHover"
            }`}
          >
            {loading ? "Updating..." : "Update Profile Picture"}
          </button>
        </form>
      </div>
    </div>
  );
}
