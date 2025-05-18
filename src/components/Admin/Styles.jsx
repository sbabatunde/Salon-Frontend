import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
import AddStyle from "./Modal/Styles/AddStyle.jsx";
import ViewStyle from "./Modal/Styles/ViewStyle.jsx";
import EditStyle from "./Modal/Styles/EditStyle.jsx";
import apiClient from "../../api/axios.js";
import { toast } from "react-toastify";
import DeleteStyle from "./Modal/Styles/DeleteStyle.jsx";

export default function Styles() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const fetchStyles = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/styles/show");
      setStyles(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching styles");
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchStyles();
  }, []);

  const filteredStyles = styles.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedStyle(null);
    setModalType("add");
  };

  const handleView = (style) => {
    setSelectedStyle(style);
    setModalType("view");
  };

  const handleEdit = (style) => {
    setSelectedStyle(style);
    setModalType("edit");
  };

  const handleDelete = (style) => {
    setSelectedStyle(style);
    setModalType("delete");
  };

  const handleAddSubmit = () => {
    fetchStyles();
    setModalType(null);
  };

  const handleDeleteConfirmed = async (style) => {
    try {
      await apiClient.delete(`/styles/delete/${style.id}`);
      setStyles((prev) => prev.filter((s) => s.id !== style.id));
      toast.success("Style deleted successfully");
    } catch (err) {
      toast.error("Failed to delete style");
    } finally {
      setModalType(null);
    }
  };

  const handleToggleStatus = async (style) => {
    const newStatus = style.status === "Active" ? "Inactive" : "Active";
  
    try {
      const response = await apiClient.put(`/styles/update/${style.id}`, {
        status: newStatus,
      });
  
      if (response.data.success) {
        // Update the style in state
        setStyles(prev =>
          prev.map(s =>
            s.id === style.id ? { ...s, status: newStatus } : s
          )
        );
  
        toast.success("Status updated!");
      }
    } catch (err) {
       // Default fallback message
       let message = "Failed to update status.";
  
       // Check if it's a validation error (Laravel sends 422 for validation errors)
       if (err.response?.status === 422) {
         const errors = err.response.data.errors;
         if (errors) {
           // Get the first error message from the first error field
           const firstError = Object.values(errors)[0]?.[0];
           message = firstError || message;
         }
       } else if (err.response?.data?.message) {
         message = err.response.data.message;
       }
   
      toast.error(message);
      console.error(err);
    }
  };
  
  const closeModal = () => {
    setModalType(null);
    setSelectedStyle(null);
  };

  // For image access
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-100">Styles</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="w-5 h-5" />
          New Style
        </button>
      </div>

      <input
        type="search"
        placeholder="Search styles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md p-3 rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="bg-neutral-900  rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2 px-3">Image</th>
              <th className="px-3">Name</th>
              <th className="px-3">Category</th>
              <th className="px-3">Tag</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStyles.map((s) => (
              <tr
                key={s.id}
                className="border-b border-neutral-800 hover:bg-yellow-900/20 transition"
              >
                
               
                <td className="px-3">
                  <img
                    src={`${BASE_URL}${s.image}`}
                    alt={s.name}
                    className="w-16 h-16 my-2 object-cover rounded-md border border-yellow-400 shadow"
                  />
                </td>
                <td className="px-3">{s.name}</td>
                <td className="px-3">{s.category}</td>
                <td className="px-3">{s.tag}</td>

                {/* Status toggle pill */}
                <td className="px-3">
                  <button
                    onClick={() => handleToggleStatus(s)}
                    className="relative inline-block w-[80px] h-[28px] overflow-hidden bg-gray-800 rounded-full text-xs uppercase font-semibold text-white cursor-pointer border border-yellow-600"
                    aria-label="Toggle status"
                  >{console.log(s.status)}
                    <span
                      className={`absolute top-0 text-white left-0 w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        s.status === "Active" ? "translate-x-0 bg-green-600" : "-translate-x-full"
                      }`}
                    >
                      Active 
                    </span>
                    <span
                      className={`absolute top-0 text-white left-full w-full h-full flex items-center justify-center transition-transform duration-300 ${
                        s.status === "Inactive" ? "-translate-x-full bg-red-600" : "translate-x-0"
                      }`}
                    >
                      Inactive
                    </span>
                  </button>
                </td>

                <td className="px-3 my-3 items-center text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleView(s)}
                    title="View"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(s)}
                    title="Edit"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(s)}
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

        {/* Loading/Empty State */}
        {loading && (
          <div className="p-8 text-center text-yellow-200 animate-pulse">
            Loading styles...
          </div>
        )}
        {!loading && filteredStyles.length === 0 && (
          <div className="p-8 text-center text-yellow-400">
            No style found
          </div>
        )}
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <AddStyle
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleAddSubmit}
          onStyleAdded={fetchStyles}
        />
      )}
      {modalType === "view" && selectedStyle && (
        <ViewStyle
          isOpen={true}
          onClose={closeModal}
          style={selectedStyle}
          BASE_URL={BASE_URL}
          
        />
      )}
      {modalType === "edit" && selectedStyle && (
        <EditStyle
          isOpen={true}
          onClose={closeModal}
          style={selectedStyle}
          onStyleUpdated={fetchStyles}
          BASE_URL={BASE_URL}
        />
      )}

    {modalType === "delete" && selectedStyle && (
        <DeleteStyle
          isOpen={true}
          onClose={closeModal}
          style={selectedStyle}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
