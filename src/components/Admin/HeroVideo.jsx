import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
import HeroVideoAddEditModal from "./Modal/HeroVideo/AddEdit.jsx";
import DeleteHeroVideo from "./Modal/HeroVideo/Delete.jsx";
import ViewHeroVideo from "./Modal/HeroVideo/View.jsx";
import apiClient from "../../api/axios.js";
import { toast } from "react-toastify";

export default function HeroVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/videos/show/all");
      setVideos(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching hero videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedVideo(null);
    setModalType("add");
    setModalOpen(true);
  };

  const handleView = (video) => {
    setSelectedVideo(video);
    setModalType("view");
    setModalOpen(true);
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setModalType("edit");
    setModalOpen(true);
  };

  const handleDelete = (video) => {
    setSelectedVideo(video);
    setModalType("delete");
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async (video) => {
    try {
      await apiClient.delete(`/videos/delete/${video.id}`);
      setVideos((prev) => prev.filter((v) => v.id !== video.id));
      toast.success("Hero video deleted");
    } catch (err) {
      toast.error("Failed to delete hero video");
    } finally {
      closeModal();
    }
  };

  const handleVideoSaved = () => {
    fetchVideos();
    closeModal();
  };

  const handleToggleStatus = async (video) => {
    const newStatus = video.status === "active" ? "inactive" : "active";

    try {
      const response = await apiClient.put(`/videos/toggle-status/${video.id}`, {
        status: newStatus,
      });

      if (response.data.success) {
        setVideos((prev) =>
          prev.map((v) => (v.id === video.id ? { ...v, status: newStatus } : v))
        );

        toast.success("Status updated!");
      }
    } catch (err) {
      let message = "Failed to update status.";
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        if (errors) {
          const firstError = Object.values(errors)[0]?.[0];
          message = firstError || message;
        }
      } else if (err.response?.data?.message) {
        message = err.response.data.message;
      }
      toast.error(message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
    setModalType(null);
  };

  function convertToYouTubeEmbed(url) {
    const videoId = url.includes("watch?v=")
      ? url.split("watch?v=")[1].split("&")[0]
      : url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-100">Site Videos</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="w-5 h-5" />
          New Video
        </button>
      </div>

      <input
        type="search"
        placeholder="Search hero videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md p-3 rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600"
      />

      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2 px-3">Video Preview</th>
              <th className="px-3">Title</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((v) => (
              <tr
                key={v.id}
                className="border-b border-neutral-800 hover:bg-yellow-900/20"
              >
              <td className="px-3 py-2">
                {v.video_path ? (
                  <video
                    src={`${BASE_URL}/storage/${v.video_path}`}
                    controls
                    className="w-32 h-20 object-cover rounded-md border border-yellow-400 shadow"
                  />
                ) : v.video_url?.includes("youtube.com") || v.video_url?.includes("youtu.be") ? (
                  <iframe
                    src={convertToYouTubeEmbed(v.video_url)}
                    className="w-32 h-20 rounded-md border border-yellow-400 shadow"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : v.video_url?.includes("tiktok.com") ? (
                  <iframe
                    src={v.video_url}
                    className="w-32 h-20 rounded-md border border-yellow-400 shadow"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : v.video_url?.includes("instagram.com") ? (
                  <iframe
                    src={`${v.video_url}embed`}
                    className="w-32 h-20 rounded-md border border-yellow-400 shadow"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : v.video_url?.includes("facebook.com") ? (
                  <iframe
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.video_url)}&show_text=false&width=200`}
                    className="w-32 h-20 rounded-md border border-yellow-400 shadow"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <span className="text-sm text-red-400">Unsupported URL</span>
                )}
              </td>


                <td className="px-3">{v.title}</td>
                <td className="px-3">
                  <button
                    onClick={() => handleToggleStatus(v)}
                    className="relative inline-block w-[80px] h-[28px] overflow-hidden bg-gray-800 rounded-full text-xs uppercase font-semibold text-white cursor-pointer border border-yellow-600"
                  >
                    <span
                      className={`absolute top-0 text-white left-0 w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        v.status === "active"
                          ? "translate-x-0 bg-green-600"
                          : "-translate-x-full"
                      }`}
                    >
                      Active
                    </span>
                    <span
                      className={`absolute top-0 text-white left-full w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        v.status === "inactive"
                          ? "-translate-x-full bg-red-600"
                          : "translate-x-0"
                      }`}
                    >
                      Inactive
                    </span>
                  </button>
                </td>
                <td className="px-3 py-4 flex justify-center items-center gap-3">
                  <button
                    onClick={() => handleView(v)}
                    title="View"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(v)}
                    title="Edit"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(v)}
                    title="Delete"
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && (
          <div className="p-8 text-center animate-pulse text-yellow-200">
            Loading hero videos...
          </div>
        )}
        {!loading && videos.length === 0 && (
          <div className="p-8 text-center text-yellow-400">
            No hero videos found.
          </div>
        )}
      </div>

      {/* Conditionally render modals based on modalType */}
      {(modalType === "add" || modalType === "edit") && (
        <HeroVideoAddEditModal
          key={modalType === "add" ? "new" : selectedVideo?.id || "modal"}
          isOpen={isModalOpen}
          onClose={closeModal}
          video={selectedVideo}
          BASE_URL={BASE_URL}
          onVideoSaved={handleVideoSaved}
        />
      )}

      {modalType === "view" && selectedVideo && (
        <ViewHeroVideo
          isOpen={isModalOpen}
          onClose={closeModal}
          video={selectedVideo}
          BASE_URL={BASE_URL}
        />
      )}

      {modalType === "delete" && selectedVideo && (
        <DeleteHeroVideo
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => handleDeleteConfirmed(selectedVideo)}
          video={selectedVideo}
        />
      )}
    </div>
  );
}
