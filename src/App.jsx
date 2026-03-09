import React, { useContext } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { AuthProvider, AuthContext } from './components/Auth/AuthContext.jsx';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './Pages/Home.jsx';
import BookAppointment from './Pages/BookAppointment.jsx';
import ViewStyles from './Pages/ViewStyles.jsx';
import BlogPost from './Pages/BlogPost.jsx';
import TestimonialForm from './Pages/TestimonialForm.jsx';
import AdminLogin from './Pages/AdminLogin.jsx';
import UpdateUserProfile from './Pages/UpdateUserProfile.jsx';

import Dashboard from './components/Admin/Dashboard/Dashboard.jsx';
import Appointments from './components/Admin/Appointments.jsx';
import Clients from './components/Admin/Clients.jsx';
import Services from './components/Admin/Services.jsx';
import Settings from './components/Admin/Settings.jsx';
import Reports from './components/Admin/Reports.jsx';
import Inventory from './components/Admin/Inventory.jsx';
import Stylists from './components/Admin/Stylist.jsx';
import Styles from './components/Admin/Styles.jsx';
import Blogs from './components/Admin/Blogs.jsx';
import SignatureLooks from './components/Admin/SignatureLook.jsx';
import HeroVideo from './components/Admin/HeroVideo.jsx';

import Unauthorized from './pages/Unauthorized.jsx';
import NotFound from './Pages/PageNotFound.jsx';

// ProtectedRoute component
function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useContext(AuthContext);
// console.log(user)
  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="booking" element={<BookAppointment />} />
          <Route path="view-styles" element={<ViewStyles />} />
          <Route path="blog" element={<BlogPost />} />
          <Route path="blogs/view/:postId" element={<BlogPost />} />
          <Route path="testimonial/form/:token" element={<TestimonialForm />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>

        {/* Protect only /admin and its nested routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="clients" element={<Clients />} />
            <Route path="services" element={<Services />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="stylists" element={<Stylists />} />
            <Route path="styles" element={<Styles />} />
            <Route path="portfolio" element={<SignatureLooks />} />
            <Route path="video" element={<HeroVideo />} />
            <Route path="profile" element={<UpdateUserProfile />} />
          </Route>
        </Route>

        {/* Unauthorized and Not Found */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <AdminLogin /> */}
    </AuthProvider>
  );
}

export default App;
