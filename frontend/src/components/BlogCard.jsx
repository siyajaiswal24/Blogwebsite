// import { useEffect, useState, useRef } from "react";

// export default function BlogCard({ blog, onRead, isOwner = false }) {
//   const [saved, setSaved] = useState(false);
//   const [toast, setToast] = useState("");
//   const toastTimer = useRef(null);

//   // Check saved state on load
//   useEffect(() => {
//     if (!blog?._id) return;

//     const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
//     setSaved(savedBlogs.includes(blog._id));

//     return () => {
//       if (toastTimer.current) {
//         clearTimeout(toastTimer.current);
//       }
//     };
//   }, [blog?._id]);

//   const showToast = (message) => {
//     setToast(message);

//     if (toastTimer.current) {
//       clearTimeout(toastTimer.current);
//     }

//     toastTimer.current = setTimeout(() => {
//       setToast("");
//     }, 2000);
//   };

//   const toggleSave = (e) => {
//     e.stopPropagation(); // IMPORTANT: prevent opening modal

//     if (!blog?._id) return;

//     const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];

//     if (saved) {
//       const updated = savedBlogs.filter(id => id !== blog._id);
//       localStorage.setItem("savedBlogs", JSON.stringify(updated));
//       setSaved(false);
//       showToast("Removed from saved");
//     } else {
//       localStorage.setItem(
//         "savedBlogs",
//         JSON.stringify([...savedBlogs, blog._id])
//       );
//       setSaved(true);
//       showToast("Saved ✓");
//     }
//   };

//   return (
//     <article
//       className="
//         relative
//         bg-luxSurface
//         border border-luxBorder
//         rounded-2xl
//         overflow-hidden
//         flex flex-col
//         h-full
//         shadow-md shadow-black/30
//         transition-all duration-300
//         hover:-translate-y-1
//         hover:shadow-xl hover:shadow-emerald-500/20
//       "
//     >
//       {/* TOAST */}
//       {toast && (
//         <div className="absolute top-3 right-3 bg-luxSurface border border-luxBorder px-3 py-1 rounded-md text-xs text-luxAccent shadow-lg z-10">
//           {toast}
//         </div>
//       )}

//       {/* CLICKABLE AREA */}
//       <div onClick={() => onRead(blog)} className="cursor-pointer">
//         <div className="h-52 w-full bg-black/20 overflow-hidden">
//           <img
//             src={blog.image}
//             alt={blog.title}
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.src = "https://picsum.photos/600/400";
//             }}
//           />
//         </div>

//         <div className="p-6 pb-4">
//           <h3 className="text-xl font-semibold text-luxHeading">
//             {blog.title}
//           </h3>

//           <p className="mt-2 text-sm text-luxText line-clamp-3">
//             {blog.description}
//           </p>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="px-6 pb-4 flex justify-between items-center text-sm text-luxMuted">
//         <span className="text-luxAccent font-medium">
//           ✍ {blog.author}
//         </span>

//         <button
//           onClick={toggleSave}
//           className={`transition ${
//             saved ? "text-luxAccent" : "hover:text-luxAccent"
//           }`}
//         >
//           {saved ? "Saved" : "Save"}
//         </button>
//       </div>
//     </article>
//   );
// }
// /****************************************************** */



import React, { useState } from "react";

export default function BlogCard({ blog, onRead, onEdit, onDelete, isOwner }) {
  if (!blog) return null;

  const { title = "Untitled", description = "", image } = blog;
  // Like state (local only)
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.likes || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    if (liked) {
      setLikeCount((c) => c - 1);
    } else {
      setLikeCount((c) => c + 1);
    }
    setLiked((v) => !v);
  };

  return (
    <article
      className="
        relative
        bg-luxSurface dark:bg-darkSurface
        border border-luxBorder dark:border-darkBorder
        rounded-xl
        overflow-hidden
        flex flex-col
        h-full
        shadow-md hover:shadow-lg dark:shadow-none dark:hover:shadow-luxAccent/10
        transition-all duration-300
        hover:-translate-y-2
        hover:border-luxAccent/50 dark:hover:border-luxAccent/50
      "
    >
      <div className="bg-luxSurface dark:bg-darkSurface rounded-xl overflow-hidden flex flex-col h-full transition-colors">
        {/* Blog image */}
        {image ? (
          <div className="relative w-full h-48 overflow-hidden group">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-luxAccent/10 to-luxSecondary/10 dark:from-luxAccent/20 dark:to-luxSecondary/20 flex items-center justify-center text-luxMuted dark:text-darkMuted transition-colors">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-xl font-bold text-luxHeading dark:text-darkHeading mb-2 line-clamp-2 group-hover:text-luxAccent dark:group-hover:text-luxAccent transition-colors">{title}</h3>

          {/* Description preview */}
          <p className="text-luxText dark:text-darkText text-sm flex-1 line-clamp-3 leading-relaxed transition-colors">
            {description.length > 100
              ? description.substring(0, 100) + "..."
              : description}
          </p>

          {/* Action buttons */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              onClick={() => onRead(blog)}
              className="text-luxAccent dark:text-luxAccent font-semibold hover:text-luxAccentHover dark:hover:text-luxAccentHover transition text-sm flex items-center gap-1"
            >
              Read More 
              <span className="transition group-hover:translate-x-1">→</span>
            </button>

            {/* Like button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium transition ${liked ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800 text-luxDanger dark:text-luxDanger" : "border-luxBorder dark:border-darkBorder text-luxMuted dark:text-darkMuted hover:border-luxDanger dark:hover:border-luxDanger hover:text-luxDanger dark:hover:text-luxDanger"}`}
              aria-pressed={liked}
              title={liked ? "Unlike" : "Like"}
            >
              <span className={`transition ${liked ? "scale-125" : ""}`}>{liked ? "♥" : "♡"}</span>
              <span>{likeCount}</span>
            </button>
          </div>

          {isOwner && (
            <div className="flex gap-2 mt-4 pt-4 border-t border-luxBorder dark:border-darkBorder transition-colors">
              <button
                onClick={() => onEdit(blog)}
                className="flex-1 text-center text-sm text-luxMuted dark:text-darkMuted hover:text-luxAccent dark:hover:text-luxAccent hover:bg-blue-50 dark:hover:bg-blue-900/20 py-2 rounded transition font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="flex-1 text-center text-sm text-luxDanger dark:text-luxDanger hover:bg-red-50 dark:hover:bg-red-900/20 py-2 rounded transition font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
