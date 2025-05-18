import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus } from "lucide-react";
import AddItem from "./Modal/Inventory/AddItem.jsx";
import ViewItem from "./Modal/Inventory/ViewItem.jsx";
import EditItem from "./Modal/Inventory/EditItem.jsx";
import apiClient from "../../api/axios.js";
import { toast } from "react-toastify";
import DeleteItem from "./Modal/Inventory/DeleteItem.jsx";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/inventory/list");
      setInventory(res.data.data || []);
    } catch (err) {
      toast.error("Error fetching inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const filteredInventory = inventory.filter((s) =>
    s.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Modal Dispaly functions
  const handleAdd = () => {
    setSelectedInventoryItem(null);
    setModalType("add");
  };

  const handleView = (item) => {
    setSelectedInventoryItem(item);
    setModalType("view");
  };

  const handleEdit = (item) => {
    setSelectedInventoryItem(item);
    setModalType("edit");
  };

  const handleDelete = (item) => {
    setSelectedInventoryItem(item);
    setModalType("delete");
  };

  //Add new inventory
  const handleAddSubmit = () => {
    setModalType(null);
  };

  const handleInventoryUpdated = (updatedInventory) => {
    setInventory((prev) =>
      prev.map((invItem) => (invItem.id === updatedInventory.id ? updatedInventory : invItem))
    );
    setModalType(null);
  };

  const handleDeleteConfirmed = async (inv) => {
    try {
      await apiClient.delete(`/inventory/delete/${inv.id}`);
      setInventory((prev) => prev.filter((s) => s.id !== inv.id));
      toast.success("Service deleted successfully");
    } catch (err) {
      // toast.error("Failed to delete Inventory item");

       // Default fallback message
       let message = "Failed to delete Inventory item";
  
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
    } finally {
      setModalType(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedInventoryItem(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-yellow-100">Inventory</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <input
        type="search"
        placeholder="Search an item..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full max-w-md p-3 rounded bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2 px-3">Product</th>
              <th className="px-3">Stock</th>
              <th className="px-3">Unit Price(Total Price)</th>
              <th className="px-3">Purchase Date</th>
              <th className="px-3">Status</th>
              <th className="px-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr
                key={item.id}
                className="border-b border-neutral-800 hover:bg-yellow-900/20 transition"
              >
                <td className="py-3 px-3">{item.product}</td>
                <td className="py-3 px-3">{item.stock}
                  <small className="text-yellow-50">
                     {" "} {item.unit}
                  </small> 
                  </td>
                <td className="px-3">
                  ₦ {new Intl.NumberFormat().format(item.price)}
                  <small className="text-yellow-50">
                     {" "}  (₦ {new Intl.NumberFormat().format(item.price * item.stock)})
                  </small> 
                </td>
                <td className="py-3 px-3">{item.acquiredOn}</td>
                {/* Status toggle pill */}
                <td>
                  {!item.status ? (
                    <span className="bg-red-700 text-red-100 px-2 py-1 rounded text-xs font-bold">Low</span>
                  ) : (
                    <span className="bg-green-700 text-green-100 px-2 py-1 rounded text-xs font-bold">OK</span>
                  )}
                </td>

                <td className="px-3 py-3 text-center flex justify-center gap-3">
                  <button
                    onClick={() => handleView(item)}
                    title="View"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    title="Edit"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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
            Loading inventory items...
          </div>
        )}
        {!loading && filteredInventory.length === 0 && (
          <div className="p-8 text-center text-yellow-400">
            No item found
          </div>
        )}
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <AddItem
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleAddSubmit}
          onInventoryItemAdded={fetchInventory}
        />
      )}
      {modalType === "view" && selectedInventoryItem && (
        <ViewItem
          isOpen={true}
          onClose={closeModal}
          item={selectedInventoryItem}
        />
      )}
      {modalType === "edit" && selectedInventoryItem && (
        <EditItem
          isOpen={true}
          onClose={closeModal}
          item={selectedInventoryItem}
          onInventoryUpdated={fetchInventory}
        />
      )}

    {modalType === "delete" && selectedInventoryItem && (
        <DeleteItem
          isOpen={true}
          onClose={closeModal}
          item={selectedInventoryItem}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
