import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import apiClient from "../api/axios.js";

export default function BlogPost({ BASE_URL }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`${BASE_URL}/blogs/view/${postId}`);
        const response = await apiClient.get('/blogs/view/'`${postId}`);
console.log(response); 
        if (!response.ok) throw new Error("Blog post not found");
        const data = await response.json();
        setPost(data.data); // adjust based on your API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [postId, BASE_URL]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (loading) return <p className="text-yellow-300 p-6">Loading...</p>;

  if (error || !post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-yellow-300 p-6">
        <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
        <Link to="/#blog">
          <button className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-semibold shadow-lg transition">
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>
        </Link>
      </section>
    );
  }

  return (
    <article className="min-h-screen bg-neutral-950 text-yellow-100 max-w-4xl mx-auto p-6 sm:p-12">
      <Link to="/#blog">
        <button className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-semibold shadow-lg transition">
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </button>
      </Link>

      <header className="mb-8 text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Sparkles className="w-7 h-7 text-yellow-400" />
          <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
            From Our Blog
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text mb-4">
          {post.title}
        </h1>
      </header>

      <img
        src={BASE_URL + post.image}
        alt={post.title}
        className="w-full rounded-3xl shadow-lg mb-8 object-cover max-h-96 mx-auto"
      />

      <section
        className="prose prose-invert prose-yellow max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
