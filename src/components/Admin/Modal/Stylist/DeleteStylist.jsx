import { AlertTriangle, User, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function DeleteStylist({ isOpen, onClose, stylist, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(stylist);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !stylist) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-neutral-900 to-red-950 border border-red-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition"
          disabled={isDeleting}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center border-4 border-red-800/50">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Stylist Info */}
        <div className="bg-red-900/20 p-4 rounded-lg mb-6 border border-red-800/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 to-red-800 flex items-center justify-center">
              {stylist.image ? (
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-100">{stylist.name}</h3>
              <p className="text-red-300/80 text-sm">{stylist.role}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-red-200 text-center mb-3">
            Delete Stylist?
          </h2>
          <p className="text-red-300/80 text-center">
            This will permanently remove <span className="font-bold text-red-200">{stylist.name}</span> 
            from your team. This action cannot be undone.
          </p>

          {stylist.awards?.length > 0 && (
            <div className="mt-4 p-3 bg-red-950/50 rounded border border-red-900">
              <p className="text-red-300 text-sm font-medium mb-2">This stylist has:</p>
              <ul className="text-xs text-red-300/80 space-y-1">
                <li>• {stylist.awards.length} award(s)</li>
                <li>• {stylist.specializations?.length || 0} specialization(s)</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-900 text-white font-bold hover:from-red-800 hover:to-red-950 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete Permanently
              </>
            )}
          </button>
        </div>

        <p className="text-red-400/60 text-xs text-center mt-6">
          Note: This will also remove them from the public team page.
        </p>
      </div>
    </div>
  );
}