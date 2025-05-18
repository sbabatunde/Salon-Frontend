// src/Pages/Admin/Stylists.jsx
export default function Stylists() {
  const stylists = [
    { id: 1, name: "Lola Smith", specialty: "Bridal Hair", phone: "08011112222" },
    { id: 2, name: "Chinwe Okafor", specialty: "Coloring", phone: "08033334444" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-100 mb-6">Stylists</h1>
      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-yellow-800">
              <th className="py-2">Name</th>
              <th>Specialty</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stylists.map((s) => (
              <tr key={s.id} className="border-b border-neutral-800">
                <td className="py-2">{s.name}</td>
                <td>{s.specialty}</td>
                <td>{s.phone}</td>
                <td>
                  <button className="text-yellow-400 hover:underline mr-2">Edit</button>
                  <button className="text-red-400 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
