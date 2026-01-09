import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  Pencil, 
  Trash, 
  Eye, 
  DollarSign, 
  TrendingUp,
  Download,
  User,
  Phone,
  Mail,
  Scissors,
  Calendar
} from "lucide-react";
import apiClient from "../../api/axios";
import EditClientModal from "./Modal/Clients/EditClient";
import ViewClientModal from "./Modal/Clients/ViewClient";
import DeleteClientModal from "./Modal/Clients/DeleteClient";
import FinancialModal from "./Modal/Clients/FinancialModal";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [financialModalOpen, setFinancialModalOpen] = useState(false);
  const [financialSummary, setFinancialSummary] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/clients");
      setClients(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching clients.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFinancialSummary = async () => {
    try {
      const res = await apiClient.get("/clients/financial/summary");
      setFinancialSummary(res.data.data);
    } catch (err) {
      console.error("Error fetching financial summary");
    }
  };

  useEffect(() => {
    fetchClients();
    fetchFinancialSummary();
  }, []);

  const handleEdit = (client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteModal = (client) => {
    setSelectedClient(client);
    setDeleteModalOpen(true);
  };

  const handleFinancialModal = (client) => {
    setSelectedClient(client);
    setFinancialModalOpen(true);
  };

  const handleSaveClient = async (updatedClient) => {
    try {

      await apiClient.put(`/clients/${updatedClient.id}`, updatedClient);
      toast.success("Client updated successfully!");
      setIsEditModalOpen(false);
      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating client");
    }
  };

  const handleDeleteConfirmed = async (client) => {
    try {
      await apiClient.delete(`/clients/${client.id}`);
      toast.success("Client deleted successfully");
      setDeleteModalOpen(false);
      fetchClients();
      fetchFinancialSummary();
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  const handleSaveFinancial = async (financialData) => {
    try {
      await apiClient.post(`/clients/${selectedClient.id}/financial`, financialData);
      toast.success("Financial record saved!");
      setFinancialModalOpen(false);
      fetchClients();
      fetchFinancialSummary();
    } catch (err) {
      toast.error("Error saving financial record");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Phone", "Email", "Service", "Date", "Amount Paid", "Cost", "Profit"];
    const csvData = clients.map(client => [
      client.name,
      client.phone,
      client.email,
      client.service,
      new Date(client.date).toLocaleDateString(),
      client.account?.amount_paid || 0,
      client.account?.total_cost || 0,
      client.account?.profit || 0
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clients-report.csv";
    a.click();
  };

  const filteredClients = clients.filter(client =>
    client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.includes(searchTerm) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openViewModal = (client) => {
    setSelectedClient(client);
    setViewModalOpen(true);
  };

  return (
    <div className="p-6 bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-200 mb-2">Client Management</h1>
            <p className="text-yellow-100/70">Manage completed clients and financial records</p>
          </div>
          
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-800 text-white rounded-lg hover:from-green-700 hover:to-emerald-900 transition mt-4 md:mt-0"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Financial Summary Cards */}
        {financialSummary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/30 p-6 rounded-xl border border-blue-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">₦{financialSummary.total_revenue?.toLocaleString()}</p>
                </div>
                <DollarSign className="w-10 h-10 text-blue-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-900/50 to-red-800/30 p-6 rounded-xl border border-red-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-200 text-sm font-medium">Total Cost</p>
                  <p className="text-2xl font-bold text-white">₦{financialSummary.total_cost?.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-red-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/50 to-green-800/30 p-6 rounded-xl border border-green-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm font-medium">Total Profit</p>
                  <p className="text-2xl font-bold text-white">₦{financialSummary.total_profit?.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-300" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/50 to-amber-800/30 p-6 rounded-xl border border-yellow-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm font-medium">Total Clients</p>
                  <p className="text-2xl font-bold text-white">{financialSummary.total_clients}</p>
                </div>
                <User className="w-10 h-10 text-yellow-300" />
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <input
            className="w-full p-4 rounded-xl bg-neutral-800 text-yellow-100 placeholder-yellow-900 border-2 border-yellow-900 focus:outline-none focus:border-yellow-600 transition-all"
            placeholder="Search clients by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Clients Table */}
        <div className="bg-neutral-800 rounded-xl shadow-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-yellow-900/30">
              <tr>
                {["Client", "Contact", "Service", "Date", "Financials", "Actions"].map((header) => (
                  <th key={header} className="px-6 py-4 text-yellow-200 text-left font-semibold text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-900/50">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-neutral-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-800/30 flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-yellow-300" />
                      </div>
                      <div>
                        <p className="text-yellow-100 font-medium">{client.name}</p>
                        <p className="text-sm text-yellow-100/70">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-yellow-100">
                        <Phone size={14} />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Scissors size={16} className="text-amber-400" />
                      <span className="text-amber-400">{client.service}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-yellow-100">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-yellow-400" />
                      {new Date(client.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm">Paid:</span>
                        <span className="text-green-300 font-medium">
                          ₦{client.account?.amount_paid?.toLocaleString() || "0"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 text-sm">Cost:</span>
                        <span className="text-red-300 font-medium">
                          ₦{client.account?.total_cost?.toLocaleString() || "0"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm">Profit:</span>
                        <span className={`font-bold ${(client.account?.profit || 0) >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                          ₦{client.account?.profit?.toLocaleString() || "0"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => openViewModal(client)}
                        className="text-yellow-400 hover:text-yellow-300 p-2 rounded-lg hover:bg-yellow-900/20"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleEdit(client)}
                        className="text-blue-400 hover:text-blue-300 p-2 rounded-lg hover:bg-blue-900/20"
                        title="Edit Client"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleFinancialModal(client)}
                        className="text-green-400 hover:text-green-300 p-2 rounded-lg hover:bg-green-900/20"
                        title="Add Financial Record"
                      >
                        <DollarSign size={18} />
                      </button>

                      <button
                        onClick={() => handleDeleteModal(client)}
                        className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-900/20"
                        title="Delete Client"
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
              Loading clients...
            </div>
          )}
          {!loading && filteredClients.length === 0 && (
            <div className="p-8 text-center text-yellow-400">
              {searchTerm ? "No clients match your search" : "No completed clients found"}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && (
        <EditClientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          client={selectedClient}
          onSave={handleSaveClient}
        />
      )}

      {viewModalOpen && (
        <ViewClientModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          client={selectedClient}
        />
      )}

      {deleteModalOpen && (
        <DeleteClientModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          client={selectedClient}
          onConfirm={handleDeleteConfirmed}
        />
      )}

      {financialModalOpen && (
        <FinancialModal
          isOpen={financialModalOpen}
          onClose={() => setFinancialModalOpen(false)}
          client={selectedClient}
          onSave={handleSaveFinancial}
        />
      )}
    </div>
  );
}