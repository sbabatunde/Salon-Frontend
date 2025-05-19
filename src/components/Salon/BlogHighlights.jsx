import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function truncateHtml(html, maxLength = 100) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
}

function BlogHighlights({ blogs = [], BASE_URL }) {
  if (!blogs.length) {
    return (
      <section id="blog" className="py-20 bg-neutral-950">
        <div className="max-w-5xl mx-auto px-4 text-yellow-300 text-center">
          <p>No blog posts available.</p>
        </div>
      </section>
    );
  }

  const BlogCard = (post) => (
    <Link
      key={post.id}
      to={`/blogs/view/${post.id}`}
      className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition flex flex-col md:flex-row h-full"
      aria-label={`Read full blog post: ${post.title}`}
    >
      <img
        src={`${BASE_URL}${post.image}`}
        alt={post.title}
        className="w-full md:w-48 h-full object-cover"
        loading="lazy"
      />
      <div className="p-6 flex flex-col justify-between">
        <h3 className="text-xl font-semibold mb-2 text-yellow-400">{truncateHtml(post.title, 20)}</h3>
        <p className="text-neutral-200 mb-4">
          {truncateHtml(post.content, 100)}
        </p>
        <span className="text-yellow-300 font-semibold">Read More →</span>
      </div>
    </Link>
  );

  return (
    <section id="blog" className="py-20 bg-neutral-950">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Sparkles className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              From Our Blog
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
              Tips, Trends & Inspiration
            </span>
          </h2>
        </div>

        {blogs.length <= 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((post) => BlogCard(post))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet custom-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
            }}
            className="pb-10"
          >
            {blogs.map((post) => (
              <SwiperSlide key={post.id} className="h-full">
                {BlogCard(post)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Custom Swiper bullet styling */}
      <style>{`
      .custom-bullet {
        background: #444;
        opacity: 0.5;
        width: 10px;
        height: 10px;
        margin: 0 5px !important;
        border-radius: 50%;
        transition: background 0.3s, transform 0.3s;
      }
      .custom-bullet-active {
        background: linear-gradient(to right, #facc15, #b91c1c);
        transform: scale(1.4);
        opacity: 1;
      }
      .swiper-pagination {
        position: relative;
        margin-top: 12px;
      }
    `}</style>

    </section>
  );
}

export default BlogHighlights;
