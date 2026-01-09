import Hero from '../components/Salon/Hero'
import Services from '../components/Salon/Services'
import Portfolio from '../components/Salon/Portfolio'
import Testimonials from '../components/Salon/Testimonials'
import About from '../components/Salon/About'
import Team from '../components/Salon/Team'
import Booking from '../components/Salon/Booking'
import ContactInfo from '../components/Salon/ContactInfo'
import BlogHighlights from '../components/Salon/BlogHighlights'
import { useState, useEffect } from "react";
import apiClient from "../api/axios"
import { useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/Salon/LoadingSpinner'

export default function HomePage() {
  const [businessInfo, setBusinessInfo] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [activeVideos, setActiveVideos] = useState([]);
  const [activeLooks, setActiveLooks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  // Smooth scroll for hash links
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  // Fetch all data with better error handling
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [
          businessResponse,
          servicesResponse,
          blogsResponse,
          videosResponse,
          portfolioResponse,
          testimonialsResponse
        ] = await Promise.all([
          apiClient.get("/settings/business/details/fetch"),
          apiClient.get("/services/list"),
          apiClient.get("/blogs/show/active"),
          apiClient.get("/videos/active"),
          apiClient.get("/portfolio/show"),
          apiClient.get("/testimonials")
        ]);

        setBusinessInfo(businessResponse.data?.data || []);
        setServices(servicesResponse.data?.data || []);
        setBlogs(blogsResponse.data?.data || []);
        setActiveVideos(videosResponse.data || []);
        setActiveLooks(portfolioResponse.data || []);
        setTestimonials(testimonialsResponse.data || []);
        
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch data");
        console.error("Data fetching error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="text-center p-8">
          <div className="text-yellow-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-neutral-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-800 rounded-lg text-white font-semibold hover:from-yellow-600 hover:to-red-900 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Hero videos={activeVideos} BASE_URL={BASE_URL} />
      <Services services={services} />
      <Portfolio images={activeLooks} BASE_URL={BASE_URL} />
      <Testimonials testimonials={testimonials} BASE_URL={BASE_URL} />
      <About />
      <Team />
      <Booking />
      <ContactInfo businessInfo={businessInfo} />
      <BlogHighlights blogs={blogs} BASE_URL={BASE_URL} />
    </div>
  );
}