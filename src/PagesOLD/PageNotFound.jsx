import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
      <AlertCircle className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-yellow-300 mb-6">
        Page Not Found
      </h2>
      <p className="max-w-md text-yellow-200 mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/home"
        className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold hover:from-yellow-600 hover:to-red-900 transition"
      >
        Return to Home
      </Link>
    </section>
  );
}
