import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
import AddService from "./Modal/Services/AddService.jsx";
import ViewService from "./Modal/Services/ViewService.jsx";
import EditService from "./Modal/Services/EditService.jsx";
import apiClient from "../../api/axios.js";
import { toast } from "react-toastify";
import DeleteService from "./Modal/Services/DeleteService.jsx";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/services/list");
      setServices(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching services");
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedService(null);
    setModalType("add");
  };

  const handleView = (service) => {
    setSelectedService(service);
    setModalType("view");
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setModalType("edit");
  };

  const handleDelete = (service) => {
    setSelectedService(service);
    setModalType("delete");
  };

  const handleAddSubmit = (newService) => {
    fetchServices();
    setModalType(null);
  };

  const handleDeleteConfirmed = async (service) => {
    try {
      await apiClient.delete(`/services/delete/${service.id}`);
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error("Failed to delete service");
    } finally {
      setModalType(null);
    }
  };

  const handleToggleStatus = async (service) => {
    const newStatus = service.status === "Active" ? "Inactive" : "Active";
  
    try {
      const response = await apiClient.put(`/services/update/${service.id}`, {
        status: newStatus,
      });
  
      if (response.data.success) {
        // Update the service in state
        setServices(prev =>
          prev.map(s =>
            s.id === service.id ? { ...s, status: newStatus } : s
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
    setSelectedService(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-100">Services</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <input
        type="search"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md p-3 rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="bg-neutral-900  rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2 px-3">Service</th>
              <th className="px-3">Price</th>
              <th className="px-3">Duration</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((s) => (
              <tr
                key={s.id}
                className="border-b border-neutral-800 hover:bg-yellow-900/20 transition"
              >
                <td className="py-3 px-3">{s.title}</td>
                <td className="px-3">₦ {new Intl.NumberFormat().format(s.price)}</td>
                <td className="px-3">{s.duration}</td>

                {/* Status toggle pill */}
                <td className="px-3">
                  <button
                    onClick={() => handleToggleStatus(s)}
                    className="relative inline-block w-[80px] h-[28px] overflow-hidden bg-gray-800 rounded-full text-xs uppercase font-semibold text-white cursor-pointer border border-yellow-600"
                    aria-label="Toggle status"
                  >
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

                <td className="px-3 py-3 text-center flex justify-center gap-3">
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
            Loading services...
          </div>
        )}
        {!loading && filteredServices.length === 0 && (
          <div className="p-8 text-center text-yellow-400">
            No services found
          </div>
        )}
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <AddService
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleAddSubmit}
          onServiceAdded={fetchServices}
        />
      )}
      {modalType === "view" && selectedService && (
        <ViewService
          isOpen={true}
          onClose={closeModal}
          service={selectedService}
        />
      )}
      {modalType === "edit" && selectedService && (
        <EditService
          isOpen={true}
          onClose={closeModal}
          service={selectedService}
          onServiceUpdated={fetchServices}
        />
      )}

    {modalType === "delete" && selectedService && (
        <DeleteService
          isOpen={true}
          onClose={closeModal}
          service={selectedService}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
