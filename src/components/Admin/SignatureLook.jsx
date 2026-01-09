import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
import SignatureLookAddEditModal from "./Modal/SignatureLook/AddEdit.jsx";
import DeleteSignatureLook from "./Modal/SignatureLook/Delete.jsx";
import ViewSignatureLook from "./Modal/SignatureLook/View.jsx";
import apiClient from "../../api/axios.js";
import { toast } from "react-toastify";

export default function SignatureLooks() {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedPic, setSelectedPic] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const fetchSignatureLooks = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/portfolio/index");

      setPictures(res.data || []);
    } catch (err) {
      toast.error("Error fetching hero videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignatureLooks();
  }, []);

  const filteredLooks = pictures.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedPic(null);
    setModalType("add");
    setModalOpen(true);
  };

  const handleView = (picture) => {
    setSelectedPic(picture);
    setModalType("view");
    setModalOpen(true);
  };

  const handleEdit = (picture) => {
    setSelectedPic(picture);
    setModalType("edit");
    setModalOpen(true);
  };

  const handleDelete = (picture) => {
    setSelectedPic(picture);
    setModalType("delete");
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async (picture) => {
    try {
      await apiClient.delete(`/portfolio/delete/${picture.id}`);
      setPictures((prev) => prev.filter((p) => p.id !== picture.id));
      toast.success("Image deleted");
    } catch (err) {
      toast.error("Failed to delete image");
    } finally {
      closeModal();
    }
  };

  const handleSignatureLookSaved = () => {
    fetchSignatureLooks();
    closeModal();
  };

  const handleToggleStatus = async (picture) => {
    const newStatus = picture.status === "active" ? "inactive" : "active";
    console.log("Toggling status for picture:", picture.id, "to", newStatus);

    try {
      const response = await apiClient.patch(`/portfolio/status/${picture.id}/toggle`, {
        status: newStatus,
      });
      console.log("Response from status toggle:", response.data);
      if (response.data.success) {
        setPictures((prev) =>
          prev.map((p) => (p.id === picture.id ? { ...p, status: newStatus } : p))
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
    setSelectedPic(null);
    setModalType(null);
  };


  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-100">Signature Looks</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="w-5 h-5" />
          New Look
        </button>
      </div>

      <input
        type="search"
        placeholder="Search signature looks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md p-3 rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600"
      />

      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2 px-3">Image Preview</th>
              <th className="px-3">Title</th>
              <th className="px-3">Tag</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLooks.map((p) => (
              <tr
                key={p.id}
                className="border-b border-neutral-800 hover:bg-yellow-900/20"
              >
              <td className="px-3 py-2">
                  <img
                    src={`${BASE_URL}/storage/${p.image}`}
                    alt={p.title}
                    className="w-16 h-16 object-cover rounded-md border border-yellow-400 shadow"
                  />
                </td>
                <td className="px-3">{p.title}</td>
                <td className="px-3">{p.tag}</td>
                <td className="px-3">
                  <button
                    onClick={() => handleToggleStatus(p)}
                    className="relative inline-block w-[80px] h-[28px] overflow-hidden bg-gray-800 rounded-full text-xs uppercase font-semibold text-white cursor-pointer border border-yellow-600"
                  >
                    <span
                      className={`absolute top-0 text-white left-0 w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        p.status === "active"
                          ? "translate-x-0 bg-green-600"
                          : "-translate-x-full"
                      }`}
                    >
                      Active
                    </span>
                    <span
                      className={`absolute top-0 text-white left-full w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        p.status === "inactive"
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
                    onClick={() => handleView(p)}
                    title="View"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(p)}
                    title="Edit"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
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
            Loading signature looks...
          </div>
        )}
        {!loading && pictures.length === 0 && (
          <div className="p-8 text-center text-yellow-400">
            No image found.
          </div>
        )}
      </div>

      {/* Conditionally render modals based on modalType */}
      {(modalType === "add" || modalType === "edit") && (
        <SignatureLookAddEditModal
          key={modalType === "add" ? "new" : selectedPic?.id || "modal"}
          isOpen={isModalOpen}
          onClose={closeModal}
          picture={selectedPic}
          BASE_URL={BASE_URL}
          onSaved={handleSignatureLookSaved}
        />
      )}

      {modalType === "view" && selectedPic && (
        <ViewSignatureLook
          isOpen={isModalOpen}
          onClose={closeModal}
          picture={selectedPic}
          BASE_URL={BASE_URL}
        />
      )}

      {modalType === "delete" && selectedPic && (
        <DeleteSignatureLook
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={() => handleDeleteConfirmed(selectedPic)}
          picture={selectedPic}
        />
      )}
    </div>
  );
}
