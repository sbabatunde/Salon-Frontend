// About.js
import { Heart, Sparkles } from "lucide-react";

function About() {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Heart className="w-7 h-7 text-yellow-400" />
          <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
            Our Story
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
            Passion, Artistry & Empowerment
          </span>
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-6">
          Founded on a love for beauty and a dedication to empowering women, our salon is more than a place for hair-it's a sanctuary where confidence is crafted and dreams come to life. Every style is a collaboration, every client a muse. From the excitement of bridal mornings to the everyday transformations, we pour our heart and expertise into every detail, ensuring you leave feeling radiant and celebrated.
        </p>
        <div className="flex justify-center mt-8">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 text-white font-bold text-lg shadow-lg transition hover:from-yellow-600 hover:to-red-900"
          >
            <Sparkles className="w-5 h-5" />
            Book Your Experience
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
