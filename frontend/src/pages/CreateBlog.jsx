import { useState, useRef } from "react";

export default function CreateBlog() {
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const formRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (!data.title || data.title.trim().length < 5) {
      setError("Title must be at least 5 characters long.");
      return;
    }
    if (!data.description || data.description.trim().length < 50) {
      setError("Blog content must be at least 50 characters long.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return setError("Login required");

    try {
      const res = await fetch("http://localhost:5050/api/blogs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          image: data.image || "",
          author: user.email,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      alert("Published ✨");
      formRef.current.reset();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not publish blog");
    }
  };

  return (
    <div className="min-h-screen bg-luxBg dark:bg-darkBg flex justify-center px-6 pt-28 pb-32">
      <form ref={formRef} onSubmit={submit} className="w-full max-w-3xl bg-luxSurface dark:bg-darkSurface border rounded-2xl p-10 space-y-6 shadow-xl">

        {/* ✅ SHOW ERROR */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input name="title" placeholder="Your title" className="w-full text-5xl font-bold bg-transparent outline-none" />

        <input name="image" placeholder="Cover image URL" className="w-full border-b pb-3 bg-transparent outline-none" />

        <textarea name="description" placeholder="Start writing..." className="w-full min-h-[360px] text-lg bg-transparent outline-none resize-none" />

        <div className="pt-6 flex gap-4">
          <button type="submit" className="px-8 py-3 bg-luxAccent text-white rounded-full">
            Publish
          </button>

          {/* ✅ Now variable is USED */}
          <button
            type="button"
            onClick={() => {
              formRef.current.reset();
              setShowDeleteConfirm(false);
            }}
            className="px-6 py-3 border rounded-full hover:text-red-400"
          >
            Delete draft
          </button>
        </div>
      </form>
    </div>
  );
}