
export default function DeleteStyle({ isOpen, onClose, onConfirm, style }) {
  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    // Close only if clicked on the backdrop, not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" 
         onClick={handleBackdropClick}>
      {/* Modal Content */}
      <div className="bg-neutral-900 rounded-lg p-6 shadow-lg max-w-md w-full border border-yellow-600 animate-fade-in-up">
        <h2 className="text-xl font-semibold text-red-400 mb-4">Delete Style -  <strong>{style?.name}</strong></h2>
        <p className="text-yellow-200 mb-6">
          Are you sure you want to delete <strong>{style?.name}</strong>? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-yellow-700 hover:bg-yellow-600 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(style)}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
