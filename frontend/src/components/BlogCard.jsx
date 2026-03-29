import React, { useState } from "react";

export default function BlogCard({ blog, onRead, onEdit, onDelete, isOwner }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog?.likes || 0);

  if (!blog) return null;

  const { title = "Untitled", description = "", image } = blog;

  const handleLike = (e) => {
    e.stopPropagation();
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    setLiked((v) => !v);
  };

  return (
    <article className="relative bg-luxSurface dark:bg-darkSurface border border-luxBorder dark:border-darkBorder rounded-xl overflow-hidden flex flex-col h-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-luxAccent/50">
      
      {image ? (
        <div className="relative w-full h-48 overflow-hidden group">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-luxAccent/10 to-luxSecondary/10 flex items-center justify-center text-luxMuted">
          <span className="text-sm font-medium">No Image</span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

        <p className="text-sm flex-1 line-clamp-3">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            onClick={() => onRead(blog)}
            className="text-luxAccent font-semibold text-sm"
          >
            Read More →
          </button>

          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm ${
              liked ? "text-red-500 border-red-300" : "text-gray-500"
            }`}
          >
            <span>{liked ? "♥" : "♡"}</span>
            <span>{likeCount}</span>
          </button>
        </div>

        {isOwner && (
          <div className="flex gap-2 mt-4 pt-4 border-t">
            <button
              onClick={() => onEdit(blog)}
              className="flex-1 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(blog._id)}
              className="flex-1 text-sm text-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}