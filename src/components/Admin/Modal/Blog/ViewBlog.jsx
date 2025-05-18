import { X, FileText, Tags, TextQuote } from "lucide-react";
import DOMPurify from "dompurify";

export default function ViewBlog({ isOpen, onClose, blog, BASE_URL }) {
  if (!isOpen || !blog) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-blog-title"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-yellow-300 hover:text-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
          aria-label="Close modal"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-center mb-6">
          <FileText className="mr-2 w-6 h-6 text-yellow-400" />
          <h2
            id="view-blog-title"
            className="text-3xl font-extrabold tracking-tight text-center"
          >
            {blog.title}
          </h2>
        </div>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={`${BASE_URL}${blog.image}`}
            alt={blog.title}
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="space-y-6 text-yellow-200 text-sm sm:text-base leading-relaxed">
          {/* Content */}
          <div>
            <div className="flex items-center mb-1">
              <TextQuote className="mr-2 w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-300">Content</h3>
            </div>
            {/* <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            /> */}
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} /> 
            
          </div>

          {/* Tag */}
          <div>
            <div className="flex items-center mb-1">
              <Tags className="mr-2 w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-300">Tag</h3>
            </div>
            <p>{blog.tag}</p>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-semibold text-yellow-300 mb-1">Status</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                blog.status === "Active"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {blog.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-yellow-700 pt-5 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Close
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s ease-out;
        }
        @keyframes fadeInModal {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
