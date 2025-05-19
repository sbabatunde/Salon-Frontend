import { X, Scissors } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function ViewServiceModal({ isOpen, onClose, service }) {
  if (!isOpen || !service) return null;

  const IconComponent = LucideIcons[service.icon] || Scissors;
  const handleBackdropClick = (e) => {
    // Close only if clicked on the backdrop, not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-service-title"
      onClick={handleBackdropClick}
    >
        <div
          className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scroll bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in"
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close view service modal"
          type="button"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Title */}
        <h2
          id="view-service-title"
          className="text-3xl font-extrabold text-center mb-4 leading-tight"
        >
          {service.title}
        </h2>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <IconComponent className="w-16 h-16 text-yellow-400" />
        </div>

        {/* Service Info */}
        <div className="space-y-4 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Description:</span><br />
            {service.description}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ₦ {new Intl.NumberFormat().format(service.price)}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {service.duration}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                service.status === "Active"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {service.status}
            </span>
          </p>
        </div>

        {/* Close CTA */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition duration-200 shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
