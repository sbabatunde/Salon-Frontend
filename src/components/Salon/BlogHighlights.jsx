import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function truncateHtml(html, maxLength = 150) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent || tempDiv.innerText || "";

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((post) => (
            <Link
              key={post.id}
              to={`/blogs/view/${post.id}`}
              className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition flex flex-col md:flex-row"
              aria-label={`Read full blog post: ${post.title}`}
            >
              <img
                src={`${BASE_URL}${post.image}`}
                alt={post.title}
                className="w-full md:w-48 h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 flex flex-col justify-between">
                <h3 className="text-xl font-semibold mb-2 text-yellow-400">{post.title}</h3>
                <p className="text-neutral-200 mb-4">
                  {truncateHtml(post.content, 150)}
                </p>
                <span className="text-yellow-300 font-semibold">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogHighlights;
