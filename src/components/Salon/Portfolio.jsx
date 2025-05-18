// Portfolio.js
import { Camera, Sparkles } from "lucide-react";
import Img2 from "../../assets/precious-hairmpire/image2.jpg";
import Img3 from "../../assets/precious-hairmpire/image3.jpg";
import Img4 from "../../assets/precious-hairmpire/image4.jpg";
import Img5 from "../../assets/precious-hairmpire/image5.jpg";
import Img6 from "../../assets/precious-hairmpire/image6.jpg";
import Img7 from "../../assets/precious-hairmpire/image8.jpg";
// Replace with real images of your work!
const images = [
  { src: Img2, alt: "Elegant bridal updo" },
  { src: Img3, alt: "Rich balayage color" },
  { src: Img4, alt: "Seamless hair extensions" },
  { src: Img5, alt: "Glamorous event styling" },
  { src: Img6, alt: "Classic bridal waves" },
  { src: Img7, alt: "Vibrant hair coloring" },
];

function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Sparkles className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              Our Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 to-red-700 text-transparent bg-clip-text">
              Signature Looks & Transformations
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 mx-auto">
            Every style tells a story. From radiant bridal updos to vibrant color transformations, our gallery celebrates the artistry and passion behind every look we create. Discover the confidence, elegance, and beauty that awaits you at our salon.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/30 transition"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-lg font-semibold drop-shadow-lg">{img.alt}</span>
              </div>
              {/* Decorative camera icon */}
              <Camera className="absolute top-4 right-4 w-7 h-7 text-yellow-400 opacity-70 group-hover:scale-110 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
