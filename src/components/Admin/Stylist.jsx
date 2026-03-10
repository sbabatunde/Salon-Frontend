import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  Pencil, 
  Trash, 
  Eye, 
  User, 
  Instagram, 
  Mail, 
  Award,
  Sparkles,
  Plus,
  Star,
  Users,
  Image as ImageIcon,
  MoveUp,
  MoveDown
} from "lucide-react";
import apiClient from "../../api/axios";
import ViewStylistModal from "./Modal/Stylist/ViewStylist";
import EditStylistModal from "./Modal/Stylist/EditStylist";
import DeleteStylistModal from "./Modal/Stylist/DeleteStylist";
import CreateStylistModal from "./Modal/Stylist/CreateStylist";

export default function Stylists() {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/stylist");
      console.log(res.data);

      setStylists(res.data.data || []);
      calculateStats(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching stylists.");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const totalStylists = data.length;
    const activeStylists = data.filter(s => s.is_active).length;
    const totalAwards = data.reduce((acc, s) => acc + (s.awards?.length || 0), 0);
    const specializations = new Set();
    data.forEach(s => {
      s.specializations?.forEach(spec => specializations.add(spec));
    });

    setStats({
      total_stylists: totalStylists,
      active_stylists: activeStylists,
      total_awards: totalAwards,
      unique_specializations: specializations.size
    });
  };

  useEffect(() => {
    fetchStylists();
  }, []);

  const handleView = (stylist) => {
    setSelectedStylist(stylist);
    setViewModalOpen(true);
  };

  const handleEdit = (stylist) => {
    setSelectedStylist(stylist);
    setEditModalOpen(true);
  };

  const handleDeleteModal = (stylist) => {
    setSelectedStylist(stylist);
    setDeleteModalOpen(true);
  };

  const handleCreate = () => {
    setCreateModalOpen(true);
  };

  const handleSaveStylist = async (formData, stylistId = null) => {
    try {
      let response;
      
      if (stylistId) {
        // Update existing - use POST with _method=PUT (Laravel method spoofing)
        response = await apiClient.post(`/stylist/${stylistId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Stylist updated successfully!");
      } else {
        // Create new
        response = await apiClient.post("/stylist", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Stylist created successfully!");
      }
      
      // Close modals and refresh
      setEditModalOpen(false);
      setCreateModalOpen(false);
      fetchStylists();
      
    } catch (err) {
      console.error('Save error:', err);
      
      // Handle validation errors
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        Object.keys(errors).forEach(key => {
          toast.error(`${key}: ${errors[key][0]}`);
        });
      } else {
        toast.error(err.response?.data?.message || "Error saving stylist");
      }
    }
  };

  const handleDeleteConfirmed = async (stylist) => {
    try {
      await apiClient.delete(`/stylist/${stylist.id}`);
      toast.success("Stylist deleted successfully");
      setDeleteModalOpen(false);
      fetchStylists();
    } catch (error) {
      toast.error("Failed to delete stylist");
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    
    const newStylists = [...stylists];
    [newStylists[index - 1], newStylists[index]] = [newStylists[index], newStylists[index - 1]];
    
    // Update display_order
    const orders = newStylists.map((stylist, idx) => ({
      id: stylist.id,
      display_order: idx + 1
    }));

    try {
      await apiClient.post("/admin/stylists/update-order", { orders });
      setStylists(newStylists);
      toast.success("Order updated");
    } catch (err) {
      toast.error("Failed to update order");
      fetchStylists(); // Revert on error
    }
  };

  const handleMoveDown = async (index) => {
    if (index === stylists.length - 1) return;
    
    const newStylists = [...stylists];
    [newStylists[index], newStylists[index + 1]] = [newStylists[index + 1], newStylists[index]];
    
    const orders = newStylists.map((stylist, idx) => ({
      id: stylist.id,
      display_order: idx + 1
    }));

    try {
      await apiClient.post("/admin/stylists/update-order", { orders });
      setStylists(newStylists);
      toast.success("Order updated");
    } catch (err) {
      toast.error("Failed to update order");
      fetchStylists(); // Revert on error
    }
  };

  const handleImageError = (stylistId) => {
  setImageErrors(prev => ({ ...prev, [stylistId]: true }));
};


  const filteredStylists = stylists.filter(stylist =>
    stylist.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stylist.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stylist.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  return (
    <div className="p-6 bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with Create Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-200">Stylist Management</h1>
            <p className="text-yellow-100/70">Manage your team of talented stylists</p>
          </div>
          
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-red-800 text-white rounded-lg hover:from-yellow-700 hover:to-red-900 transition mt-4 md:mt-0"
          >
            <Plus size={18} />
            Add New Stylist
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/30 p-4 rounded-xl border border-purple-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-xs">Total Stylists</p>
                  <p className="text-2xl font-bold text-white">{stats.total_stylists}</p>
                </div>
                <Users className="w-8 h-8 text-purple-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/50 to-green-800/30 p-4 rounded-xl border border-green-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-xs">Active</p>
                  <p className="text-2xl font-bold text-white">{stats.active_stylists}</p>
                </div>
                <User className="w-8 h-8 text-green-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/50 to-amber-800/30 p-4 rounded-xl border border-amber-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-200 text-xs">Total Awards</p>
                  <p className="text-2xl font-bold text-white">{stats.total_awards}</p>
                </div>
                <Award className="w-8 h-8 text-amber-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 p-4 rounded-xl border border-blue-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-xs">Specializations</p>
                  <p className="text-2xl font-bold text-white">{stats.unique_specializations}</p>
                </div>
                <Sparkles className="w-8 h-8 text-blue-300" />
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <input
            className="w-full p-4 rounded-xl bg-neutral-800 text-yellow-100 placeholder-yellow-900 border-2 border-yellow-900 focus:outline-none focus:border-yellow-600 transition-all"
            placeholder="Search stylists by name, role, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Stylists Table */}
        <div className="bg-neutral-800 rounded-xl shadow-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-yellow-900/30">
              <tr>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm w-16">Order</th>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">Stylist</th>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">Role</th>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">Contact</th>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">Awards</th>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">Status</th>
                <th className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-900/50">
              {filteredStylists.map((stylist, index) => (
                <tr key={stylist.id} className="hover:bg-neutral-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded hover:bg-yellow-900/20 ${
                          index === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-yellow-400'
                        }`}
                      >
                        <MoveUp size={16} />
                      </button>
                      <span className="text-yellow-200 font-mono w-6 text-center">{index + 1}</span>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === filteredStylists.length - 1}
                        className={`p-1 rounded hover:bg-yellow-900/20 ${
                          index === filteredStylists.length - 1 ? 'text-gray-600 cursor-not-allowed' : 'text-yellow-400'
                        }`}
                      >
                        <MoveDown size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-red-800 flex items-center justify-center mr-3 flex-shrink-0">
                        {stylist.image ? (
                          <img
                            src={`${BASE_URL}/storage/${stylist.image}`}
                            alt={stylist.name}
                            className="w-10 h-10 rounded-full object-cover"
                          onError={() => handleImageError(stylist.id)}
                          />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-yellow-100 font-medium">{stylist.name}</p>
                        <p className="text-xs text-yellow-100/70">{stylist.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-amber-400 font-medium">{stylist.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {stylist.instagram && (
                        <div className="flex items-center gap-1 text-xs text-pink-400">
                          <Instagram size={12} />
                          <span>{stylist.instagram}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs text-blue-400">
                        <Mail size={12} />
                        <span className="truncate max-w-[120px]">{stylist.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {stylist.awards?.slice(0, 2).map((award, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-amber-900/30 text-amber-300 rounded-full text-xs"
                        >
                          <Award size={10} />
                          {award.length > 15 ? award.substring(0, 15) + '...' : award}
                        </span>
                      ))}
                      {stylist.awards?.length > 2 && (
                        <span className="text-xs text-gray-400">+{stylist.awards.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      stylist.is_active 
                        ? 'bg-green-900/30 text-green-300 border border-green-700/50' 
                        : 'bg-red-900/30 text-red-300 border border-red-700/50'
                    }`}>
                      {stylist.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(stylist)}
                        className="text-yellow-400 hover:text-yellow-300 p-1 rounded hover:bg-yellow-900/20"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(stylist)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/20"
                        title="Edit Stylist"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDeleteModal(stylist)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/20"
                        title="Delete Stylist"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Loading/Empty States */}
          {loading && (
            <div className="p-8 text-center text-yellow-200 animate-pulse">
              Loading stylists...
            </div>
          )}
          {!loading && filteredStylists.length === 0 && (
            <div className="p-8 text-center text-yellow-400">
              {searchTerm ? "No stylists match your search" : "No stylists found. Click 'Add New Stylist' to create one."}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {viewModalOpen && (
        <ViewStylistModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          stylist={selectedStylist}
        />
      )}

      {editModalOpen && (
        <EditStylistModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          stylist={selectedStylist}
          onSave={handleSaveStylist}
        />
      )}

      {createModalOpen && (
        <CreateStylistModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSave={handleSaveStylist}
        />
      )}

      {deleteModalOpen && (
        <DeleteStylistModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          stylist={selectedStylist}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}