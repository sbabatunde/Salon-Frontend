
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Pencil, Trash,Eye } from "lucide-react";
import apiClient from "../../api/axios";
import EditAppointment from "./Modal/Appointments/EditAppointment";
import ViewAppointment from "./Modal/Appointments/ViewAppointment";
import DeleteAppointment from "./Modal/Appointments/DeleteAppointment";

export default function Appointments() {
  // ... existing state and fetch logic ...
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/appointments/list");
      setAppointments(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteModal = (appointment) => {
    setSelectedAppointment(appointment);
    setDeleteModalOpen(true);
  };

  const handleSave = async (updated) => {
    try {
      const res = await apiClient.put(`/appointments/update/${updated.id}`, updated);
      toast.success("Appointment updated!");
      setIsEditModalOpen(false);
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error(err);
  
      // Default fallback message
      let message = "Error updating this appointment.";
  
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
    }
  };
  

  const handleDeleteConfirmed = async (appointments) => {
    try {
      await apiClient.delete(`/appointments/delete/${appointments.id}`);
      setAppointments((prev) => prev.filter((s) => s.id !== appointments.id));
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error("Failed to delete service");
    } finally {
      setModalType(null);
    }
  };
  
  const filtered = appointments.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const openViewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setViewModalOpen(true);
  };

  return (
    <div className="p-6 bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-200 mb-8">Appointment Management</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            className="w-full p-4 rounded-xl bg-neutral-800 text-yellow-100 placeholder-yellow-900 border-2 border-yellow-900 focus:outline-none focus:border-yellow-600 transition-all"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Appointments Table */}
        <div className="bg-neutral-800 rounded-xl shadow-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-yellow-900/30">
              <tr>
                {["Client", "Service", "Email", "Phone", "Date", "Time", "Status", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-900/50">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-neutral-700/20 transition-colors">
                  <td className="px-6 py-4 text-yellow-100">{a.name}</td>
                  <td className="px-6 py-4 text-amber-400">{a.service}</td>
                  <td className="px-6 py-4 text-yellow-100">{a.email}</td>
                  <td className="px-6 py-4 text-yellow-100">{a.phone}</td>
                  <td className="px-6 py-4 text-yellow-100">{new Date(a.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-yellow-100">{a.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      a.status === "Completed" 
                        ? "bg-green-800 text-green-100" 
                        : a.status ==="Confirmed" 
                        ? "bg-blue-800 text-blue-100"
                        : a.status ==="Cancelled" 
                        ? "bg-red-800 text-red-100"
                        : "bg-amber-800 text-amber-100"

                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openViewModal(a)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <Eye size={18} />
                      </button>

                      <button 
                        onClick={() => handleEdit(a)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        aria-label="Edit appointment"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteModal(a)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete appointment"
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
              Loading appointments...
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="p-8 text-center text-yellow-400">
              No appointments found
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <EditAppointment
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            appointment={selectedAppointment}
            onSave={handleSave}
          />
        )}

        {/* View Modal */}
        {viewModalOpen && (
          <ViewAppointment
            isOpen={viewModalOpen}
            onClose={() => setViewModalOpen(false)}
            appointment={selectedAppointment}
          />
        )}

         {/* View Modal */}
         {deleteModalOpen && (
          <DeleteAppointment
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            appointment={selectedAppointment}
            onConfirm={handleDeleteConfirmed}
          />
        )}
      </div>
    </div>
  );
}
