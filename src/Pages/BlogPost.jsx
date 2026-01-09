import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Calendar, User, Clock, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import apiClient from "../api/axios.js";

export default function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  
  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/blogs/view/${postId}`);
        const data = response.data;
        setPost(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-300 text-lg">Loading article...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-yellow-300 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
          <p className="text-neutral-400 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/#blog">
            <motion.button 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-semibold shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </motion.button>
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <motion.article 
      className="min-h-screen bg-neutral-950 text-yellow-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <header className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/#blog">
              <motion.button 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-yellow-200 font-semibold shadow-lg transition-all mb-8 group"
                whileHover={{ scale: 1.05, x: -5 }}
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </motion.button>
            </Link>

            <div className="flex justify-center items-center gap-2 mb-6">
              <Sparkles className="w-7 h-7 text-yellow-400" />
              <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
                Beauty Insights
              </span>
            </div>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
                {post.title}
              </span>
            </motion.h1>

            {/* Meta Information */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-6 text-neutral-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-yellow-400" />
                <span>By {post.author || 'Precious Hairmpire'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>{calculateReadTime(post.content)} min read</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Featured Image */}
      <motion.div 
        className="max-w-4xl mx-auto px-4 -mt-8 mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={BASE_URL + post.image}
            alt={post.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.section 
        className="max-w-3xl mx-auto px-4 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div 
          className="prose prose-invert prose-yellow prose-lg max-w-none
                     prose-headings:text-yellow-200
                     prose-p:text-neutral-300 prose-p:leading-relaxed
                     prose-strong:text-yellow-300
                     prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline
                     prose-blockquote:border-yellow-400 prose-blockquote:bg-yellow-400/10
                     prose-ul:text-neutral-300 prose-ol:text-neutral-300
                     prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share Section */}
        <motion.div 
          className="mt-12 p-6 bg-neutral-800/50 rounded-2xl border border-yellow-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-200">Share this article</span>
          </div>
          <div className="flex gap-4">
            {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
              <motion.button
                key={platform}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-neutral-300 font-medium transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {platform}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </motion.article>
  );
}