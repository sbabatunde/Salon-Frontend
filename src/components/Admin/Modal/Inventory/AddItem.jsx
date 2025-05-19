import React, { useState, useMemo, useEffect } from "react";
import {
  X,
  Calendar,
  Text,
  TextQuote,
  ShoppingBag,
  Ruler,
  UploadCloud
} from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../../../api/axios";
import { FaNairaSign } from "react-icons/fa6";

export default function AddItem({ isOpen, onClose, onInventoryItemAdded }) {
  const [form, setForm] = useState({
    product: "",
    stock: "",
    acquiredOn: "",
    price: "",
    remark: "",
    unit: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      const cleaned = value.replace(/[^0-9,]/g, "");
      setForm((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const payload = {
        product: form.product.trim(),
        stock: form.stock.trim(),
        acquiredOn: form.acquiredOn,
        price: Number(form.price.replace(/,/g, "")),
        remark: form.remark.trim(),
        unit: form.unit.trim(),
      };

      const res = await apiClient.post("/inventory/create", payload);
      toast.success("Item added successfully!");
      onInventoryItemAdded?.(res.data);
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Failed to add Item. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formatPriceOnKeyUp = () => {
      const raw = form.price.replace(/,/g, "");
      if (!isNaN(raw) && raw) {
        const formatted = parseInt(raw).toLocaleString();
        setForm((prev) => ({ ...prev, price: formatted }));
      }
  };

  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    // Close only if clicked on the backdrop, not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2" onClick={handleBackdropClick}>

      <div
       className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scroll bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in"
       role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close modal"
          disabled={loading}
        >
          <X className="w-7 h-7" />
        </button>

        <h2 className="text-yellow-100 text-2xl font-extrabold mb-6 text-center tracking-wide">
          Add New Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-1 text-yellow-100">
          {/* Title */}
            <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Product Name</label>
            </div>
            <div className="relative">
            <Text className="absolute left-3 top-3 w-5 h-5 text-yellow-400 mb-2" />
            <input
              name="product"
              type="text"
              value={form.product}
              onChange={handleChange}
              placeholder="Product name"
              required
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

           {/* Stock */}
           <div className="mb-0 mt-2">
               <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Total Purchased(stock)</label>
           </div>
            <div className="relative">
              <ShoppingBag className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="total value purchased e.g., 40"
                required
                className="pl-10 py-2 w-full mb-2 rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

             {/* Stock Unit*/}
            <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Stock Unit</label>
            </div>
            <div className="relative">
              <Ruler className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="unit (e.g. litres,pieces, bundles,etc)"
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>


            {/* Price */}
            <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Unit Price</label>
            </div>
            <div className="relative">
              <FaNairaSign className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                onKeyUp={formatPriceOnKeyUp}
                placeholder="unit price e.g., 500"
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

          {/* Purchase Date */}
          <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Date Purchased</label>
          </div>
          <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="acquiredOn"
                type="date"
                value={form.acquiredOn}
                onChange={handleChange}
                placeholder="Purchase date"
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

           {/* Remark or Comment */}
          <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Comment/Remark</label>
          </div>
           <div className="relative">
              <TextQuote className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <textarea
                name="remark"
                value={form.remark}
                onChange={handleChange}
                placeholder="Remark or any comment..."
                required
                rows={3}
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-yellow-700 text-yellow-100 hover:bg-neutral-800 hover:text-yellow-400 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold flex items-center gap-2 hover:from-yellow-600 hover:to-red-900 transition"
              disabled={loading}
            >
              <UploadCloud className="w-5 h-5" />
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
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
