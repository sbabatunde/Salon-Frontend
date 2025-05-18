// import Hero from '../components/Hero'
import Hero from '../components/Salon/Hero'
import Services from '../components/Salon/Services'
import Portfolio from '../components/Salon/Portfolio'
import Testimonials from '../components/Salon/Testimonials'
import About from '../components/Salon/About'
import Team from '../components/Salon/Team'
import Booking from '../components/Salon/Booking'
import ContactInfo from '../components/Salon/ContactInfo'
import BlogHighlights from '../components/Salon/BlogHighlights'
import { useState,useEffect } from "react";
import apiClient from "../api/axios"
import { useLocation } from 'react-router-dom'

// import Pricing from '../components/Price'

export default function HomePage () {

  //Contact Info
  const [businessInfo, setBusinessInfo] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  //Get Business Details
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await apiClient.get("/settings/business/details/fetch");
        const data = response.data?.data || [];
        setBusinessInfo(data);
        // console.log(data);
        
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, []);

  //Get Services 
  useEffect(() => {
    const fetchServicesOffered = async () => {
      try {
        const response = await apiClient.get("/services/list");
        const data = response.data?.data || [];
        setServices(data);
        // console.log(data);
        
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchServicesOffered();
  }, []);

  //Get Services 
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await apiClient.get("/blogs/show");
        const data = response.data?.data || [];
        setBlogs(data);
        // console.log(data);
        
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, []);


  return (
    <>
        {/* <div className="max-w-7xl mx-auto pt-20 px-6"> */}
        <Hero />
        <Services  services = {services} />
        <Portfolio  />
        <Testimonials />
        <About />
        <Team />
        <Booking />
        <ContactInfo businessInfo = {businessInfo} />
        <BlogHighlights blogs={blogs} BASE_URL ={BASE_URL} />
        {/* <Pricing /> */}
      {/* </div> */}
    </>
  )
}
