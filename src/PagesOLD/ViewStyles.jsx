import { useState, useEffect } from "react";
import apiClient from "../api/axios";
import Spinner from "../components/Spinner";

export default function ViewStyles() {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await apiClient.get("/styles/show");
        const data = response.data?.data || [];
        setStyles(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch styles.");
      } finally {
        setLoading(false);
      }
    };
    fetchStyles();
  }, []);

  return (
    <section className="min-h-screen bg-neutral-950 py-16 px-6 sm:px-12 lg:px-24">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12">
        Our Signature Styles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Loading Spinner */}
        {loading && (
          <div className="col-span-full">
            <Spinner />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="col-span-full p-8 text-center text-red-400">
            {error}
          </div>
        )}

        {/* No styles found */}
        {!loading && !error && styles.length === 0 && (
          <div className="col-span-full p-8 text-center text-yellow-400">
            No style found
          </div>
        )}

        {/* Styles Grid */}
        {!loading && styles.map((s) => (
          <div
            key={s.id}
            className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-yellow-500/50 cursor-pointer"
          >
            <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
              <img
                src={BASE_URL + s.image}
                alt={s.name}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">{s.name}</h2>
              <p className="text-yellow-200 text-sm mb-4">{s.description}</p>
              <a
                className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-neutral-900 font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition"
                // onClick={() => alert(`Book style: ${s.name}`)}
                href={`/booking?style=${encodeURIComponent(s.name || "name")}`}
                // aria-label={`Book appointment for ${s.title}`}
              >
                Book Style
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
