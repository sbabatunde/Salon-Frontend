import { useState} from "react";
import {
  X,
  Save,
  TextQuote,
  Text,
  ListCheck,
  Upload,
  UploadCloud,
  Tags
} from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../../../api/axios";

export default function AddStyle({ isOpen, onClose, onStyleAdded,onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    category: "",
    description: "",
    tag: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    // setForm({ ...form, [e.target.name]: e.target.value });
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prevForm) => ({
        ...prevForm,
        image: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    try {

      /* Currently, you're sending it as a plain JSON object (payload),
         but files (like images) must be sent using FormData to properly 
         encode the file for transmission.
      */
      // const payload = {
      //   name: form.name.trim(),
      //   image: form.files,
      //   category: form.category,
      //   tag: form.tag.trim(),
      //   description: form.description.trim(),
      // };

      const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("image", form.image); // Use the actual file object
        formData.append("category", form.category);
        formData.append("tag", form.tag.trim());
        formData.append("description", form.description.trim());

        /**
         * multipart/form-data must be explicitly set for file uploads.
         */
        const res = await apiClient.post("/styles/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

      toast.success("New Style added successfully!");
      onStyleAdded?.(res.data);
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        "Failed to add new style. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    // Close only if clicked on the backdrop, not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2" onClick={handleBackdropClick}>

      <div
       className="bg-neutral-900 border border-yellow-700 rounded-2xl shadow-2xl w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:max-w-2xl p-6 sm:p-8 relative animate-fade-in overflow-y-auto max-h-[90vh]"
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
          Add New Style
        </h2>
        <form onSubmit={handleSubmit} className="space-y-1 text-yellow-100">
          {/* Title */}
            <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Style Name</label>
            </div>
            <div className="relative">
            <Text className="absolute left-3 top-3 w-5 h-5 text-yellow-400 mb-2" />
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter style name..."
              required
              className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Image Upload Field */}
          <div className="mt-4">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-semibold text-yellow-500"
            >
              Style Picture
            </label>

            <div className="relative flex items-center justify-center border-2 border-dashed border-yellow-600 rounded-lg p-4 bg-neutral-800 hover:border-yellow-400 transition duration-200">
              <Upload className="w-6 h-6 text-yellow-500 mr-2" />

              <label
                htmlFor="image"
                className="cursor-pointer text-yellow-400 hover:underline"
              >
                Click to upload image
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {form.image && (
              <p className="mt-2 text-sm text-yellow-400 truncate">
                Selected file: {form.image.name}
              </p>
            )}
          </div>


          {/* Description */}
          <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Description</label>
          </div>
           <div className="relative">
              <TextQuote className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="describe the style briefly..."
                required
                rows={3}
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Category*/}
            <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Category</label>
            </div>
            <div className="relative">
              <ListCheck className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="unit (e.g. Styling,Color,Haircut,etc.)"
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

             {/* Tags*/}
            <div className="mb-0 mt-2">
                <label htmlFor="stock" className="bg-gradient-to-r from-yellow-400 to-yellow-800 bg-clip-text font-semibold">Tag</label>
            </div>
            <div className="relative">
              <Tags className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="tag"
                value={form.tag}
                onChange={handleChange}
                placeholder="unit (e.g. Trendy,Casual,Warm Tones,Natural,etc.)"
                required
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-3 mt-6">
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
