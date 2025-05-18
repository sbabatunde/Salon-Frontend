import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
import BlogAddEditModal from "./Modal/Blog/AddEditBlog.jsx";
import DeleteBlog from "./Modal/Blog/DeleteBlog.jsx";
import ViewBlog from "./Modal/Blog/ViewBlog.jsx";
import apiClient from "../../api/axios.js";
import { toast } from "react-toastify";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/blogs/show");
      setBlogs(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedBlog(null);
    setModalType("add");
    setModalOpen(true);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setModalType("view");
    setModalOpen(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setModalType("edit");
    setModalOpen(true);
  };

  const handleDelete = (blog) => {
    setSelectedBlog(blog);
    setModalType("delete");
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async (blog) => {
    try {
      await apiClient.delete(`/blogs/delete/${blog.id}`);
      setBlogs(prev => prev.filter((b) => b.id !== blog.id));
      toast.success("Blog deleted");
    } catch (err) {
      toast.error("Failed to delete blog");
    } finally {
      closeModal();
    }
  };

  const handleBlogSaved = () => {
    fetchBlogs();
    closeModal();
  };

  const handleToggleStatus = async (blog) => {
    const newStatus = blog.status === "Active" ? "Inactive" : "Active";

    try {
      const response = await apiClient.put(`/blogs/update/${blog.id}`, {
        status: newStatus,
      });

      if (response.data.success) {
        setBlogs(prev =>
          prev.map(b =>
            b.id === blog.id ? { ...b, status: newStatus } : b
          )
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
    setSelectedBlog(null);
    setModalType(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-100">Blogs</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="w-5 h-5" />
          New Blog
        </button>
      </div>

      <input
        type="search"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md p-3 rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600"
      />

      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2 px-3">Image</th>
              <th className="px-3">Title</th>
              <th className="px-3">Tag</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((b) => (
              <tr key={b.id} className="border-b border-neutral-800 hover:bg-yellow-900/20">
                <td className="px-3 py-2">
                  <img
                    src={`${BASE_URL}${b.image}`}
                    alt={b.title}
                    className="w-16 h-16 object-cover rounded-md border border-yellow-400 shadow"
                  />
                </td>
                <td className="px-3">{b.title}</td>
                <td className="px-3">{b.tag}</td>
                <td className="px-3">
                  <button
                    onClick={() => handleToggleStatus(b)}
                    className="relative inline-block w-[80px] h-[28px] overflow-hidden bg-gray-800 rounded-full text-xs uppercase font-semibold text-white cursor-pointer border border-yellow-600"
                  >
                    <span
                      className={`absolute top-0 text-white left-0 w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        b.status === "Active" ? "translate-x-0 bg-green-600" : "-translate-x-full"
                      }`}
                    >
                      Active
                    </span>
                    <span
                      className={`absolute top-0 text-white left-full w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        b.status === "Inactive" ? "-translate-x-full bg-red-600" : "translate-x-0"
                      }`}
                    >
                      Inactive
                    </span>
                  </button>
                </td>
                <td className="px-3 py-4 flex justify-center items-center gap-3">
                  <button onClick={() => handleView(b)} title="View" className="text-yellow-400 hover:text-yellow-300"><Eye size={18} /></button>
                  <button onClick={() => handleEdit(b)} title="Edit" className="text-blue-500 hover:text-blue-400"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(b)} title="Delete" className="text-red-500 hover:text-red-400"><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loading && <div className="p-8 text-center animate-pulse text-yellow-200">Loading blogs...</div>}
        {!loading && blogs.length === 0 && <div className="p-8 text-center text-yellow-400">No blogs found.</div>}
      </div>

      {/* Conditionally render modals based on modalType */}
      {(modalType === "add" || modalType === "edit") && (
        <BlogAddEditModal
          key={modalType === "add" ? "new" : selectedBlog?.id || "modal"}
          isOpen={isModalOpen}
          onClose={closeModal}
          blog={selectedBlog}
          BASE_URL={BASE_URL}
          onBlogSaved={handleBlogSaved}
        />
      )}

      {modalType === "view" && selectedBlog && (
        <ViewBlog
          isOpen={isModalOpen}
          onClose={closeModal}
          style={selectedBlog}
          blog={selectedBlog}
          BASE_URL={BASE_URL}
        />
      )}

      {modalType === "delete" && selectedBlog && (
        <DeleteBlog
          isOpen={isModalOpen}
          onClose={closeModal}
          style={selectedBlog}
          onConfirm={() => handleDeleteConfirmed(selectedBlog)}
        />
      )}
    </div>
  );
}
