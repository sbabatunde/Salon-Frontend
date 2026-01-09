import { useState, useEffect } from "react";
import { X, UploadCloud, FileText, Tag } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../../../api/axios";

export default function SignatureLookAddEdit({ isOpen, onClose, onSaved, picture = null, BASE_URL }) {
  const isEdit = Boolean(picture);

  const [form, setForm] = useState({
    title: "",
    tag: "",
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && picture) {
      setForm({
        title: picture.title || "",
        tag: picture.tag || "",
        image: null,
      });
      setPreview(picture.image ? `${BASE_URL}/storage/${picture.image}` : "");
    } else {
      setForm({ title: "", tag: "", image: null });
      setPreview("");
    }
  }, [picture, isEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(file ? URL.createObjectURL(file) : "");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("tag", form.tag);
    formData.append("status", "active");
    if (form.image) formData.append("image", form.image);
    if (picture?.id) formData.append("id", picture.id);

    setLoading(true);
    try {

        const route = isEdit ? `/portfolio/edit/${picture.id}?_method=PUT` : "/portfolio/store";
        
         const res =   await apiClient.post(route, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
      console.log(res);
      toast.success(`Signature look ${isEdit ? "updated" : "added"} successfully!`);
      onSaved?.();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        `Failed to ${isEdit ? "update" : "save"} signature look.`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[calc(100vh-4rem)] overflow-y-auto custom-scroll bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl p-8 md:p-10 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          disabled={loading}
        >
          <X className="w-7 h-7" />
        </button>
        <h2 className="text-2xl font-extrabold text-center mb-6 tracking-wide">
          {isEdit ? "Edit Signature Look" : "Add Signature Look"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="font-semibold">Title</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title..."
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="font-semibold">Tag</label>
            <div className="relative mt-1">
              <Tag className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="Enter tag..."
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold">Image</label>
            <div
              className="relative flex items-center justify-center border-2 border-dashed border-yellow-600 rounded-lg p-4 bg-neutral-800 hover:border-yellow-400 transition"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud className="w-6 h-6 text-yellow-500 mr-2" />
              <label htmlFor="image" className="cursor-pointer text-yellow-400 hover:underline">
                Click or drag to upload
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            {preview && (
              <div className="py-2 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-48 rounded shadow border border-yellow-500"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-3 mt-4">
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
              {loading ? (isEdit ? "Updating..." : "Saving...") : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>

        <style>{`
          .animate-fade-in {
            animation: fadeInModal 0.25s ease-out;
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
