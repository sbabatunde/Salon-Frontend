import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <section className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 text-center">
      <Lock className="w-20 h-20 text-yellow-500 mb-6" />
      <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">401</h1>
      <h2 className="text-3xl font-semibold text-yellow-300 mb-6">
        Unauthorized Access
      </h2>
      <p className="max-w-md text-yellow-200 mb-8">
        You do not have permission to view this page. Please login with appropriate credentials.
      </p>
      <Link
        to="/login"
        className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-semibold hover:from-yellow-600 hover:to-red-900 transition"
      >
        Go to Login
      </Link>
    </section>
  );
}
