import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import apiClient from "../../src/api/token"; // your axios instance

const ProtectedRoute = ({ allowedRoles }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Fetch authenticated user info including role
    apiClient.get("/api/user")
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-yellow-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role not authorized, redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  // Authorized, render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
