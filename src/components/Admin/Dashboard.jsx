// src/Pages/Admin/Dashboard.jsx
import { stats } from "../../constants/admin";

export default function Dashboard() {
  console.log(stats);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-100 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-neutral-900 rounded-xl p-6 flex items-center gap-4 shadow hover:shadow-yellow-400/20 transition">
            {stat.icon}
            <div>
              <div className="text-2xl font-bold text-yellow-100">{stat.value}</div>
              <div className="text-yellow-300">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Add charts or recent activity here */}
      <div className="bg-neutral-900 rounded-xl p-6 shadow text-yellow-100">
        <h2 className="font-bold mb-4">Recent Activity</h2>
        <p>No recent activity yet.</p>
      </div>
    </div>
  );
}
