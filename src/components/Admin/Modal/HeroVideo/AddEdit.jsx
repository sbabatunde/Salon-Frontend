import { useState, useEffect } from "react";
import { X, UploadCloud, FileText, Link2, Video, Info } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "../../../../api/axios";

export default function HeroVideoAddEdit({ isOpen, onClose, onVideoSaved, video = null, BASE_URL }) {
  const isEdit = Boolean(video);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active",
    videoFile: null,
    videoUrl: "",
  });

  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && video) {
      setForm({
        title: video.title || "",
        description: video.description || "",
        status: video.status || "active",
        videoFile: null,
        videoUrl: video.video_url || "",
      });
      setPreview(video.video_path ? `${BASE_URL}/storage/${video.video_path}` : "");
    } else {
      setForm({
        title: "",
        description: "",
        status: "active",
        videoFile: null,
        videoUrl: "",
      });
      setPreview("");
    }
  }, [video, isEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "videoFile") {
      const file = files[0];
      setForm((prev) => ({ ...prev, videoFile: file }));
      setPreview(file ? URL.createObjectURL(file) : "");
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "videoUrl") setPreview("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setForm((prev) => ({ ...prev, videoFile: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.videoFile && !form.videoUrl && !video?.video_path && !video?.video_url)
      return toast.error("Please upload a video file or provide a video URL");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("status", form.status);
      if (form.videoFile) formData.append("video", form.videoFile);
      if (form.videoUrl) formData.append("url", form.videoUrl);
      if (video?.id) formData.append("id", video.id);

      await apiClient.post("/videos/store", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Hero video ${isEdit ? "updated" : "added"} successfully!`);
      onVideoSaved?.();
      onClose();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})?.[0]?.[0] ||
        `Failed to ${isEdit ? "update" : "save"} video.`;
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
          {isEdit ? "Edit Hero Video" : "Upload Hero Video"}
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
          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <div className="relative mt-1">
              <Info className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description..."
                rows={3}
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          {/* Status */}
          {/* <div>
            <label className="font-semibold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full py-2 rounded bg-neutral-800 border border-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div> */}
          {/* File upload */}
          <div>
            <label className="font-semibold">Video File</label>
            <div
              className="relative flex items-center justify-center border-2 border-dashed border-yellow-600 rounded-lg p-4 bg-neutral-800 hover:border-yellow-400 transition"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <UploadCloud className="w-6 h-6 text-yellow-500 mr-2" />
              <label htmlFor="videoFile" className="cursor-pointer text-yellow-400 hover:underline">
                Click or drag to upload
                <input
                  id="videoFile"
                  name="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
            {preview && (
              <div className="py-2 flex justify-center">
                <video
                  src={preview}
                  controls
                  className="max-h-48 rounded shadow border border-yellow-500"
                />
              </div>
            )}
          </div>
          {/* Or URL */}
          <div>
            <label className="font-semibold">Or Video URL</label>
            <div className="relative mt-1">
              <Link2 className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
              <input
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="pl-10 py-2 w-full rounded bg-neutral-800 border border-yellow-700 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
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
              <Video className="w-5 h-5" />
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
