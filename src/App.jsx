import { Route, 
  createBrowserRouter,
   createRoutesFromElements,
   RouterProvider} from 'react-router-dom';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Home.jsx';
import MainLayout from './layouts/MainLayout';
import BookAppointment from './Pages/BookAppointment.jsx';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/Admin/Dashboard.jsx';
import Appointments from './components/Admin/Appointments.jsx';
import Clients from './components/Admin/Clients.jsx';
import Services from './components/Admin/Services.jsx';
import Settings from './components/Admin/Settings.jsx';
import Reports from './components/Admin/Reports.jsx';
import Inventory from './components/Admin/Inventory.jsx';
import Stylists from './components/Admin/Stylists.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewStyles from './Pages/ViewStyles.jsx';
import Styles from './components/Admin/Styles.jsx';
import Blogs from './components/Admin/Blogs.jsx';
import BlogPost from './Pages/BlogPost.jsx';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

         <Route path ='/' element={<MainLayout />}>
        <Route index element = {<Home />} />
        <Route path='/booking' element = {<BookAppointment />} />
        <Route path="/view-styles" element={<ViewStyles />} />
        <Route path="/blog" element={<BlogPost />} />
        <Route path="/blogs/view/:postId" element={<BlogPost />} />

        {/* <Route path='*' element = {<NotFoundPage />} />  */}
      </Route>

        {/* Admin Section */}
        <Route path='/admin' element={<AdminLayout />}>

          <Route index element={<Dashboard />} />
          <Route path='appointments' element={<Appointments />} />
          <Route path='clients' element={<Clients />} />
          <Route path='services' element={<Services />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='settings' element={<Settings />} />
          <Route path ='reports' element={<Reports />} />
          <Route path='inventory' element={<Inventory />} />
          <Route path='stylists' element={<Stylists />} />
          <Route path='styles' element={<Styles />} />
        </Route>
      </>
   
      
      )
  );
  
  return <RouterProvider router={router}/>
}

export default App