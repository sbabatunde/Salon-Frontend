import { X } from "lucide-react";

export default function ViewItem({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full  max-w-md bg-gradient-to-b from-neutral-600 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-6 md:p-8 animate-fade-in space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">{item.product}</h2>

        {/* Divider */}
        <hr className="border-yellow-700" />

        {/* Details Section */}
        <div className="space-y-4 text-sm md:text-base">
          <div>
            <span className="font-semibold">Stock:</span>
            <p>
              {item.stock} <small>{item.unit}</small>
            </p>
          </div>

          <div>
            <span className="font-semibold">Unit Price (Total):</span>
            <p>
              ₦{new Intl.NumberFormat().format(item.price)}{" "}
              <small>
                (₦{new Intl.NumberFormat().format(item.price * item.stock)})
              </small>
            </p>
          </div>

          <div>
            <span className="font-semibold">Purchase Date:</span>
            <p>{item.acquiredOn}</p>
          </div>

          <div>
            <span className="font-semibold">Remark:</span>
            <p>{item.remark || "No remarks provided."}</p>
          </div>

          <div>
            <span className="font-semibold mr-2">Status:</span>
            <div
              className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                item.status === true
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {item.status === true ? "Ok" : "Low"}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-yellow-700 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition duration-200 shadow"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
