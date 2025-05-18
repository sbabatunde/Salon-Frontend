// Testimonials.js
import { Quote, Star } from "lucide-react";
import { testimonials } from "../../constants";
// Replace with real client reviews and images!
// const testimonials = [
//   {
//     name: "Sarah Williams",
//     image: "/images/client1.jpg",
//     review:
//       "My bridal hair was absolutely stunning and lasted all night! The team made me feel like royalty. I can’t recommend them enough.",
//     rating: 5,
//   },
//   {
//     name: "Jessica Lee",
//     image: "/images/client2.jpg",
//     review:
//       "From color to cut, every visit is a treat. The stylists truly listen and bring my vision to life. I always leave feeling confident and beautiful.",
//     rating: 5,
//   },
//   {
//     name: "Emily Carter",
//     image: "/images/client3.jpg",
//     review:
//       "The extensions are seamless and natural. I get compliments everywhere I go! The salon’s atmosphere is so welcoming and chic.",
//     rating: 5,
//   },
// ];

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-neutral-950">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Quote className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              Client Love
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            We believe every guest deserves to feel beautiful, confident, and cared for. Here’s what our clients have to say about their experience at our salon:
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-yellow-400/20 transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full border-4 border-yellow-400 mb-4 shadow-md"
              />
              <div className="flex gap-1 mb-2">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-200 text-center italic mb-4">
                “{t.review}”
              </p>
              <span className="font-semibold text-yellow-300">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
