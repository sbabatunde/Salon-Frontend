import { Sparkles, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function truncateHtml(html, maxLength = 100) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function BlogHighlights({ blogs = [], BASE_URL }) {
  if (!blogs.length) {
    return (
      <section id="blog" className="py-20 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl text-yellow-200 mb-2">Coming Soon</h3>
          <p className="text-neutral-300">Stay tuned for exciting beauty tips and trends!</p>
        </div>
      </section>
    );
  }

  const BlogCard = (post) => (
    <motion.div
      key={post.id}
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/blogs/view/${post.id}`}
        className="group bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-500 border border-yellow-500/10 hover:border-yellow-500/30 flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={`${BASE_URL}${post.image}`}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-lg rounded-lg px-3 py-1">
            <div className="flex items-center gap-1 text-white text-sm">
              <Calendar className="w-3 h-3" />
              {formatDate(post.created_at)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-3 text-yellow-400 group-hover:text-yellow-300 transition-colors line-clamp-2">
            {truncateHtml(post.title, 60)}
          </h3>
          
          <p className="text-neutral-300 mb-4 flex-grow leading-relaxed">
            {truncateHtml(post.content, 120)}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-yellow-500/20">
            <div className="flex items-center gap-2 text-neutral-400 text-sm">
              <User className="w-4 h-4" />
              <span>By {post.author || 'Admin'}</span>
            </div>
            
            <motion.span 
              className="flex items-center gap-1 text-yellow-400 font-semibold text-sm group-hover:text-yellow-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              Read More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section id="blog" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex justify-center items-center gap-3 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-lg">
              Beauty Insights
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-red-600 text-transparent bg-clip-text">
              Tips & Trends
            </span>
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Stay updated with the latest hair trends, styling tips, and beauty secrets from our expert stylists.
          </p>
        </motion.div>

        {/* Blog Posts */}
        {blogs.length <= 2 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {blogs.map((post) => BlogCard(post))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{ 
                delay: 5000, 
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
              }}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet custom-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
              }}
              navigation={{
                nextEl: '.blog-swiper-button-next',
                prevEl: '.blog-swiper-button-prev',
              }}
              className="pb-16 relative"
            >
              {blogs.map((post) => (
                <SwiperSlide key={post.id} className="h-auto">
                  {BlogCard(post)}
                </SwiperSlide>
              ))}

              {/* Custom Navigation */}
              <div className="blog-swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all cursor-pointer shadow-lg">
                ←
              </div>
              <div className="blog-swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all cursor-pointer shadow-lg">
                →
              </div>
            </Swiper>
          </motion.div>
        )}

        {/* View All Blogs CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/blogs"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-yellow-400 text-yellow-200 hover:bg-yellow-400 hover:text-neutral-900 font-semibold text-lg transition-all"
            whileHover={{ scale: 1.05 }}
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .custom-bullet {
          background: #444;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          margin: 0 5px !important;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          background: linear-gradient(to right, #facc15, #b91c1c);
          transform: scale(1.4);
          opacity: 1;
        }
        .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default BlogHighlights;