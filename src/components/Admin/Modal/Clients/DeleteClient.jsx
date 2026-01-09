// components/Clients/Modals/DeleteClient.jsx
import { AlertTriangle, User, Trash2, X } from "lucide-react";
import { useState } from "react";

export default function DeleteClientModal({ isOpen, onClose, client, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(client);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-neutral-900 to-red-950 border border-red-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition"
          disabled={isDeleting}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-900/30 flex items-center justify-center border-4 border-red-800/50">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Client Info */}
        <div className="bg-red-900/20 p-4 rounded-lg mb-6 border border-red-800/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-red-800/30 flex items-center justify-center">
              <User className="w-6 h-6 text-red-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-100">{client.name}</h3>
              <p className="text-red-300/80 text-sm">{client.phone}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-red-300">
              <span className="font-semibold">Service:</span>
              <p className="truncate">{client.service}</p>
            </div>
            <div className="text-red-300">
              <span className="font-semibold">Date:</span>
              <p>{new Date(client.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Warning Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-red-200 text-center mb-3">
            Delete Client Record?
          </h2>
          <p className="text-red-300/80 text-center">
            This action will permanently delete <span className="font-bold text-red-200">{client.name}'s</span> record
            and all associated financial data. This cannot be undone.
          </p>
          
          {/* Financial Data Warning */}
          {client.account && (
            <div className="mt-4 p-3 bg-red-950/50 rounded border border-red-900">
              <p className="text-red-300 text-sm font-medium mb-1">Financial data that will be lost:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-green-300">
                  Paid: ₦{(client.account.amount_paid || 0).toLocaleString()}
                </div>
                <div className="text-blue-300">
                  Profit: ₦{(client.account.profit || 0).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
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
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-700 to-red-900 text-white font-bold hover:from-red-800 hover:to-red-950 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Additional Warning */}
        <p className="text-red-400/60 text-xs text-center mt-6">
          Note: This action will affect financial reports and cannot be recovered.
        </p>
      </div>
    </div>
  );
}