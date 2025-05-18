import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect,useState } from "react";
import apiClient from "../api/axios";
const MainLayout = () => {

  const [businessInfo, setBusinessInfo] = useState(null);
    useEffect(() => {
      const fetchBusinessDetails = async () => {
        try {
          const response = await apiClient.get("/settings/business/details/fetch");
          const data = response.data?.data || [];
          setBusinessInfo(data);
          console.log(data);
          
          
        } catch (err) {
          console.log(err.response?.data?.message || "Failed to fetch buisness details");
        } finally {
          console.log(false);
        }
      };
  
      fetchBusinessDetails();
    }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer businessInfo={businessInfo}/>
    </>
  );
};

export default MainLayout;
