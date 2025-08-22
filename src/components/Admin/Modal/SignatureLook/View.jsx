import { X, ImageIcon } from "lucide-react";

export default function ViewSignatureLook({ isOpen, onClose, picture, BASE_URL }) {
  if (!isOpen || !picture) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-signature-look-title"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scroll bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in"
      >
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
          <ImageIcon className="mr-2 w-6 h-6 text-yellow-400" />
          <h2
            id="view-signature-look-title"
            className="text-3xl font-extrabold tracking-tight text-center"
          >
            {picture.title}
          </h2>
        </div>

        {/* Image Display */}
        <div className="flex justify-center mb-6">
          <img
            src={`${BASE_URL}/storage/${picture.image}`}
            alt={picture.title}
            className="w-full max-w-md rounded-xl border-4 border-yellow-400 shadow-lg object-cover"
          />
        </div>

      

        {/* Tags */}
        {picture.tags && picture.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-yellow-300 mb-1">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {picture.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 rounded-full bg-yellow-600 text-white text-xs font-semibold uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Status */}
        <div>
          <h3 className="font-semibold text-yellow-300 mb-1">Status</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              picture.status === "active"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {picture.status}
          </span>
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
