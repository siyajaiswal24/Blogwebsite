import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5050/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setImage(data.image || "");
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5050/api/blogs/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image,
        author: user.email,
      }),
    });

    alert("Blog updated successfully");
    navigate("/my-blogs");
  };

  if (loading) return <p className="text-center py-20 text-luxText dark:text-darkText transition-colors">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-screen bg-luxBg dark:bg-darkBg transition-colors">
      <h2 className="text-3xl font-bold text-luxHeading dark:text-darkHeading transition-colors mb-6">Edit Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}   // ✅ FIX
          className="w-full p-3 border border-luxBorder dark:border-darkBorder bg-transparent text-luxText dark:text-darkText rounded-md outline-none focus:border-luxAccent dark:focus:border-luxAccent transition placeholder:text-luxMuted dark:placeholder:text-darkMuted"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)} // ✅ FIX
          rows="6"
          className="w-full p-3 border border-luxBorder dark:border-darkBorder bg-transparent text-luxText dark:text-darkText rounded-md outline-none focus:border-luxAccent dark:focus:border-luxAccent transition placeholder:text-luxMuted dark:placeholder:text-darkMuted"
        />

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)} // ✅ FIX
          className="w-full p-3 border border-luxBorder dark:border-darkBorder bg-transparent text-luxText dark:text-darkText rounded-md outline-none focus:border-luxAccent dark:focus:border-luxAccent transition placeholder:text-luxMuted dark:placeholder:text-darkMuted"
        />

        <button className="bg-luxAccent text-white px-6 py-2 rounded hover:bg-luxAccentHover transition">
          Update Blog
        </button>
      </form>
    </div>
  );
}
