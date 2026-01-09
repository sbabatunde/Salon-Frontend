// components/Clients/Modals/FinancialModal.jsx
import { useState, useEffect, useRef } from "react";
import { X, DollarSign, Calculator, Package, FileText, CreditCard } from "lucide-react";

export default function FinancialModal({ isOpen, onClose, client, onSave }) {
  const [formData, setFormData] = useState({
    amount_paid: client?.account?.amount_paid || "",
    service_cost: client?.account?.service_cost || "",
    material_cost: client?.account?.material_cost || "",
    other_cost: client?.account?.other_cost || "",
    payment_method: client?.account?.payment_method || "cash",
    notes: client?.account?.notes || "",
  });

  const modalRef = useRef(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericData = {
      ...formData,
      amount_paid: parseFloat(formData.amount_paid) || 0,
      service_cost: parseFloat(formData.service_cost) || 0,
      material_cost: parseFloat(formData.material_cost) || 0,
      other_cost: parseFloat(formData.other_cost) || 0,
    };
    onSave(numericData);
  };

  const calculateTotals = () => {
    const amount = parseFloat(formData.amount_paid) || 0;
    const service = parseFloat(formData.service_cost) || 0;
    const material = parseFloat(formData.material_cost) || 0;
    const other = parseFloat(formData.other_cost) || 0;
    
    const totalCost = service + material + other;
    const profit = amount - totalCost;

    return { totalCost, profit };
  };

  const totals = calculateTotals();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose} // Close when clicking outside
    >
      <div 
        ref={modalRef}
        className="bg-neutral-900 border border-green-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-neutral-900 border-b border-green-700/50 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-green-100 text-2xl font-extrabold">
                Financial Record
              </h2>
              <p className="text-green-300/80 text-sm mt-1">{client?.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-yellow-200 hover:text-yellow-400 transition p-2 rounded-full hover:bg-neutral-800"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Paid */}
            <div>
              <label className="block text-green-300 text-sm font-medium mb-2">
                Amount Paid
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                <input
                  name="amount_paid"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount_paid}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-green-700 text-green-100 placeholder-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Service Cost */}
            <div>
              <label className="block text-blue-300 text-sm font-medium mb-2">
                Service Cost
              </label>
              <div className="relative">
                <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  name="service_cost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.service_cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-blue-700 text-blue-100 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Material Cost */}
            <div>
              <label className="block text-amber-300 text-sm font-medium mb-2">
                Material Cost <span className="text-amber-500/70">(Optional)</span>
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" />
                <input
                  name="material_cost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.material_cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-amber-700 text-amber-100 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Other Cost */}
            <div>
              <label className="block text-red-300 text-sm font-medium mb-2">
                Other Costs <span className="text-red-500/70">(Optional)</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400" />
                <input
                  name="other_cost"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.other_cost}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-red-700 text-red-100 placeholder-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-yellow-300 text-sm font-medium mb-2">
                Payment Method
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-400 z-10" />
                <select
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  className="pl-10 pr-10 py-3 w-full rounded-lg bg-neutral-800 border border-yellow-700 text-yellow-100 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="cash">Cash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="card">Debit/Credit Card</option>
                  <option value="pos">POS</option>
                  <option value="online">Online Payment</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">
                Notes <span className="text-purple-500/70">(Optional)</span>
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about this transaction..."
                rows="3"
                className="w-full py-3 px-4 rounded-lg bg-neutral-800 border border-purple-700 text-purple-100 placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Summary */}
            <div className="p-5 bg-gradient-to-r from-neutral-800/50 to-neutral-900/30 rounded-xl border border-gray-700 shadow-lg">
              <h3 className="text-gray-300 font-semibold mb-4 text-center">Summary</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="text-center p-3 bg-red-900/20 rounded-lg border border-red-800/30">
                  <p className="text-sm text-red-300 mb-1">Total Cost</p>
                  <p className="text-xl font-bold text-red-200">₦{totals.totalCost.toLocaleString()}</p>
                </div>
                <div className={`text-center p-3 rounded-lg border ${
                  totals.profit >= 0 
                    ? 'bg-green-900/20 border-green-800/30' 
                    : 'bg-red-900/20 border-red-800/30'
                }`}>
                  <p className={`text-sm mb-1 ${totals.profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {totals.profit >= 0 ? 'Profit' : 'Loss'}
                  </p>
                  <p className={`text-xl font-bold ${totals.profit >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                    ₦{Math.abs(totals.profit).toLocaleString()}
                  </p>
                </div>
              </div>
              
              {/* Revenue Display */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="text-green-300 font-bold text-lg">
                    ₦{(parseFloat(formData.amount_paid) || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Add padding at the bottom for scroll spacing */}
            <div className="pb-4"></div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 bg-neutral-900 border-t border-green-700/30 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition font-medium hover:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-800 text-white font-bold hover:from-green-700 hover:to-emerald-900 transition shadow-lg hover:shadow-green-900/30"
            >
              Save Financial Record
            </button>
          </div>
        </div>
      </div>

      {/* Fade in animation */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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