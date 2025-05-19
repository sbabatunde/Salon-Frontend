import { X } from "lucide-react";

export default function ViewStyle({ isOpen, onClose, style,BASE_URL}) {
  if (!isOpen || !style) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-service-title"
      onClick={handleBackdropClick}
    >
        {/* Enables Scrolling when content too much on y-axis  */}
        <div
          className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scroll bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in"
        > 
          {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-yellow-300 hover:text-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
          aria-label="Close modal"
          disabled={false}
        >
          <X className="w-7 h-7" />
        </button>

        {/* Title */}
        <h2
          id="view-service-title"
          className="text-4xl font-extrabold text-center mb-6 tracking-tight"
        >
          {style.name}
        </h2>

        {/* Image */}
        <div className="flex justify-center mb-6">
          <img
            src={`${BASE_URL}${style.image}`}
            alt={style.name}
            className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
            loading="lazy"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-5 text-yellow-200 text-sm sm:text-base leading-relaxed">
          <div>
            <h3 className="font-semibold text-yellow-300 mb-1">Description</h3>
            <p className="whitespace-pre-wrap">{style.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-300 mb-1">Category</h3>
            <p>{style.category}</p>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-300 mb-1">Tag</h3>
            <p>{style.tag}</p>
          </div>

          <div>
            <h3 className="font-semibold text-yellow-300 mb-1">Status</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                style.status === "Active"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {style.status}
            </span>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 border-t border-yellow-700 pt-5 flex justify-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Close
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
