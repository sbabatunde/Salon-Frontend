// src/components/Layout.js
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-neutral-950">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* <Navbar /> */}
        <Outlet />
      </main>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </div>
  );
}
