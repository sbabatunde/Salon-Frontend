import { clients } from "../../constants/admin";
// src/Pages/Admin/Clients.jsx
export default function Clients() {
 
  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-100 mb-6">Clients</h1>
      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2">Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-neutral-800">
                <td className="py-2">{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.lastVisit}</td>
                <td>
                  <button className="text-yellow-400 hover:underline mr-2">View</button>
                  <button className="text-red-400 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
