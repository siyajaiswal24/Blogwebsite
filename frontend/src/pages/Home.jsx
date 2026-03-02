
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import ExploreTopicsModal from "../components/ExploreTopicsModal";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showTopics, setShowTopics] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all blogs
  useEffect(() => {
    fetch("http://localhost:5050/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then((data) => setBlogs(data))
      .catch((err) => {
        console.error(err);
        setError("Could not load blogs");
      });
  }, []);

  // Scroll to blogs section
  const scrollToBlogs = () => {
    document.getElementById("blogs")?.scrollIntoView({
      behavior: "smooth",

    });
  };

  // Delete blog
  const handleDelete = async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const res = await fetch(`http://localhost:5050/api/blogs/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: user.email }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Could not delete blog");
    }
  };

  return (
    <div className="bg-gradient-to-b from-luxBg to-white dark:from-darkBg dark:to-darkSurface transition-colors duration-300">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 animate-fadeIn">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-7xl md:text-6xl font-bold leading-tight text-luxHeading dark:text-darkHeading max-w-4xl transition-colors">
            Share Your Ideas
            <span className="block text-luxAccent dark:text-luxAccent mt-3">with the World</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-luxText dark:text-darkText transition-colors">
            A beautiful platform to write, share, and discover amazing stories and insights from creative minds.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={scrollToBlogs}
              className="px-8 py-3 bg-luxAccent text-white font-semibold rounded-lg hover:bg-luxAccentHover transition shadow-lg hover:shadow-xl"
            >
              Explore Stories
            </button>

            <button
              onClick={() => setShowTopics(true)}
              className="px-8 py-3 border-2 border-luxAccent dark:border-luxAccent text-luxAccent dark:text-luxAccent font-semibold rounded-lg hover:bg-luxAccent hover:text-white dark:hover:bg-luxAccent dark:hover:text-white transition"
            >
              Explore Topics
            </button>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-luxBorder dark:via-darkBorder to-transparent transition-colors"></div>
      </div>

      {/* BLOG GRID */}
      <section
        id="blogs"
        className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {error && (
          <p className="col-span-full text-center text-luxDanger text-lg font-medium bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors">
            {error}
          </p>
        )}
        {blogs.length === 0 && !error && (
          <p className="col-span-full text-center text-luxMuted dark:text-darkMuted text-lg py-12 transition-colors">
            No blogs available yet. Be the first to share your story!
          </p>
        )}
        {blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            isOwner={true}
            onRead={() => setSelectedBlog(blog)}
            onEdit={() => navigate(`/edit/${blog._id}`)}
            onDelete={() => handleDelete(blog._id)}
          />
        ))}
      </section>

      {/* BLOG MODAL */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}

      {/* EXPLORE TOPICS MODAL */}
      {showTopics && (
        <ExploreTopicsModal
          open={showTopics}
          onClose={() => setShowTopics(false)}
        />
      )}
    </div>
  );
}

