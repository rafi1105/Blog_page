import React from 'react';
import Image from 'next/image';

const BlogPostCard = ({ post, onEdit, onDelete, showActions = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="glass-ultra rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 group animate-slide-in border border-blue-200/30 dark:border-blue-400/20 bg-white/30 dark:bg-black/20">
      {/* Image */}
      {post.imageUrl && (
        <div className="relative w-full h-52 mb-6 rounded-xl overflow-hidden shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
        </div>
      )}
      
      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-black dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {post.content}
        </p>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 text-xs rounded-full border border-blue-300/50 dark:border-blue-400/50 backdrop-blur-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Author and Date */}
        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-blue-200/30 dark:border-blue-400/20">
          <span className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{post.author?.charAt(0) || 'A'}</span>
            </div>
            <span>By {post.author}</span>
          </span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">{formatDate(post.createdAt)}</span>
        </div>
        
        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-3 pt-4 border-t border-blue-200/30 dark:border-blue-400/20">
            <button
              onClick={() => onEdit && onEdit(post)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-700 dark:text-blue-300 rounded-xl border border-blue-300/50 dark:border-blue-400/50 transition-all duration-300 text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(post.id)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 text-red-700 dark:text-red-300 rounded-xl border border-red-300/50 dark:border-red-400/50 transition-all duration-300 text-sm font-medium hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;
