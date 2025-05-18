import { useState, useEffect } from "react";
import { X, UploadCloud, FileText, Tags, TextQuote } from "lucide-react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import apiClient from "../../../../api/axios";
import "react-quill/dist/quill.snow.css";

export default function BlogAddEditModal({ isOpen, onClose, onBlogSaved, blog = null, BASE_URL }) {
  // Comprehensive toolbar options
  const toolbarOptions = [
    [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link', 'image', 'video', 'formula'],
    ['clean'] // remove formatting
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'link', 'image', 'video', 'formula'
  ];

  const isEdit = Boolean(blog);
  const [form, setForm] = useState({
    title: "",
    content: "",
    tag: "",
    image: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (isEdit && blog) {
      setForm({
        title: blog.title || "",
        content: blog.content || "",
        tag: blog.tag || "",
        image: "",
      });
      setPreviewImage(BASE_URL + (blog.image || ""));
    }
  }, [blog, BASE_URL, isEdit]);

  // Form input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target || {};
    if (name === "image") {
      const selected = files[0];
      setForm((prev) => ({ ...prev, image: selected }));
      setPreviewImage(URL.createObjectURL(selected));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("tag", form.tag);
      if (form.image) formData.append("image", form.image);

      const endpoint = isEdit ? `/blogs/update/${blog.id}?_method=PUT` : "/blogs/create";
      const res = await apiClient.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Blog ${isEdit ? "updated" : "created"} successfully!`);
      onBlogSaved?.(res.data);
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        `Failed to ${isEdit ? "update" : "create"} blog.`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Close modal when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2"
      onClick={handleBackdropClick}
    >
      <div className="bg-neutral-900 border border-yellow-700 rounded-2xl shadow-2xl w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:max-w-2xl p-6 sm:p-8 relative animate-fade-in overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-200 hover:text-yellow-400 transition"
          disabled={loading}
        >
          <X className="w-7 h-7" />
        </button>

        <h2 className="text-yellow-100 text-2xl font-extrabold mb-6 text-center tracking-wide">
          {isEdit ? "Edit Blog Post" : "Create Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-yellow-100">
          {/* Title */}
          <div>
            <label className="font-semibold">Title</label>
            <div className="relative mt-1">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Blog title..."
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="font-semibold">Content</label>
            <div className="relative mt-1">
              <TextQuote className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <div className="pl-10 w-full rounded bg-neutral-900 border border-yellow-700 focus-within:ring-2 focus-within:ring-yellow-500">
                {/* Quill must not be inside a styled input, just use a div */}
                <ReactQuill
                  value={form.content}
                  onChange={(value) => setForm((prev) => ({ ...prev, content: value }))}
                  placeholder="Write blog content here..."
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  style={{ minHeight: '300px' }}
                />
              </div>
            </div>
          </div>

          {/* Tag */}
          <div>
            <label className="font-semibold">Tag</label>
            <div className="relative mt-1">
              <Tags className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="e.g. Trends, Tips, Tutorial"
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold">Cover Image</label>
            <div className="relative flex items-center justify-center border-2 border-dashed border-yellow-600 rounded-lg p-4 bg-neutral-800 hover:border-yellow-400 transition duration-200">
              <UploadCloud className="w-6 h-6 text-yellow-500 mr-2" />
              <label htmlFor="image" className="cursor-pointer text-yellow-400 hover:underline">
                Click to upload
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {previewImage && (
              <div className="py-2 flex justify-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-h-48 rounded shadow border border-yellow-500"
                />
              </div>
            )}
          </div>

          {/* Actions */}
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
              <UploadCloud className="w-5 h-5" />
              {loading ? (isEdit ? "Updating..." : "Saving...") : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Custom Quill Styling */}
      <style>{`
        .animate-fade-in {
          animation: fadeInModal 0.25s ease-out;
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ql-toolbar {
          background-color: #1f2937;
          border-color: #d97706;
          color: #facc15;
        }
        .ql-toolbar .ql-picker,
        .ql-toolbar .ql-stroke,
        .ql-toolbar .ql-fill,
        .ql-toolbar .ql-picker-label,
        .ql-toolbar .ql-picker-options {
          color: #facc15 !important;
          stroke: #facc15 !important;
          fill: #facc15 !important;
        }
        .ql-toolbar .ql-active,
        .ql-toolbar .ql-picker-item.ql-selected {
          background-color: #fde68a !important;
          color: #000 !important;
        }
        .ql-container {
          background-color: #1f2937;
          color: #f3f4f6;
          border-color: #d97706;
        }
        .ql-editor {
          min-height: 150px;
          color: #f3f4f6;
        }
      `}</style>
    </div>
  );
}
