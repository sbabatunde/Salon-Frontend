import { useState, useEffect } from "react";
import { X, TextQuote, Text, ListCheck, Upload, Save, Tags } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../../../api/axios";

export default function EditStyleModal({ isOpen, onClose, style, onStyleUpdated, BASE_URL }) {
  const [form, setForm] = useState({
    name: "",
    image: null,
    category: "",
    description: "",
    tag: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (style) {
      setForm({
        name: style.name || "",
        image: null,
        category: style.category || "",
        description: style.description || "",
        tag: style.tag || "",
      });
      setImagePreview(style.image ? `${BASE_URL}${style.image}` : "");
    }
  }, [style, BASE_URL]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.tag.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("category", form.category.trim());
      formData.append("description", form.description.trim());
      formData.append("tag", form.tag.trim());
      if (form.image) {
        formData.append("image", form.image);
      }
  
      // Debug log
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      /*
      * When sending FormData via Axios with a PUT request, 
      * the browser doesn’t automatically set Content-Type to multipart/form-data 
      * with a boundary, which Laravel needs to properly parse the file. 
      * Axios handles POST correctly, but with PUT, this can silently break.  
      * Laravel ends up receiving a string instead of a file — which causes the validation error:
      * “image must be a file of type: jpeg, png, jpg”
      */
      const res = await apiClient.post(`/styles/update/${style.id}?_method=PUT`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Style updated successfully!");
      onStyleUpdated?.(res.data);
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Failed to update style. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen || !style) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
          className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scroll bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          aria-label="Close modal"
          disabled={loading}
        >
          <X className="w-7 h-7" />
        </button>

        <h2 className="text-yellow-100 text-2xl font-extrabold mb-6 text-center tracking-wide">Edit Style</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-yellow-100" noValidate>

          {/* Name */}
          <div>
            <label className="block font-semibold text-yellow-500 mb-2" htmlFor="name">Style Name</label>
            <div className="relative">
              <Text className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter style name..."
                disabled={loading}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-yellow-500 mb-2" htmlFor="image-upload">Style Image</label>
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-yellow-600 rounded-lg p-4 bg-neutral-800 hover:bg-neutral-700/50 transition cursor-pointer"
            >
              <Upload className="w-8 h-8 text-yellow-500 mb-2" />
              <span className="text-yellow-400 text-center">
                Click to upload new image
                <br />
                <span className="text-sm text-yellow-500">(JPEG/PNG only)</span>
              </span>
              <input
                id="image-upload"
                type="file"
                name="image"
                accept="image/jpeg,image/png"
                onChange={handleChange}
                className="hidden"
                disabled={loading}
              />
            </label>

            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Style preview"
                  className="max-h-48 rounded-lg border border-yellow-700 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-yellow-500 mb-2" htmlFor="description">Description</label>
            <div className="relative">
              <TextQuote className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Describe the style..."
                disabled={loading}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-yellow-500 mb-2" htmlFor="category">Category</label>
            <div className="relative">
              <ListCheck className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. Styling, Haircut"
                disabled={loading}
              />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="block font-semibold text-yellow-500 mb-2" htmlFor="tag">Tag</label>
            <div className="relative">
              <Tags className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                id="tag"
                name="tag"
                type="text"
                value={form.tag}
                onChange={handleChange}
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. Trendy, Casual"
                disabled={loading}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-yellow-700 text-yellow-100 hover:bg-neutral-800 transition"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold flex items-center gap-2 transition"
              disabled={loading}
            >
              <Save className="w-5 h-5" />
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>

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
    </div>
  );
}
