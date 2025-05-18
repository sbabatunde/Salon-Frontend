import { useState, useEffect } from "react";
import { Scissors, Sparkles, CalendarCheck } from "lucide-react";
import video1 from "../../assets/precious-hairmpire/video1.mp4";
import video2 from "../../assets/precious-hairmpire/video2.mp4";
import video3 from "../../assets/precious-hairmpire/video3.mp4";
import video4 from "../../assets/precious-hairmpire/video4.mp4";
import video5 from "../../assets/precious-hairmpire/video5.mp4";
// import eprop from "../../assets/eprop.mp4";
// import eprop2 from "../../assets/eprop2.mp4";

const slides = [
  { type: "video", src: video1 },
  { type: "video", src: video2 },
  { type: "video", src: video3 },
  { type: "video", src: video4 },
  { type: "video", src: video5 },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1500 ${
            idx === current ? "opacity-100 z-0" : "opacity-0"
          }`}
        >
          {slide.type === "video" ? (
            <video
              src={slide.src}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
          ) : (
            <img
              src={slide.src}
              alt=""
              className="object-cover w-full h-full"
            />
          )}
          {/* Overlay for darkening the background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-7 h-7 text-yellow-400 drop-shadow" />
          <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
            Bridal & Luxury Hair
          </span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-center mb-6 tracking-wide text-white drop-shadow-lg">
          Elevate Your{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-red-700 text-transparent bg-clip-text">
            Beauty
          </span>{" "}
          with{" "}
          <Scissors className="inline w-10 h-10 text-yellow-400 align-middle drop-shadow" />
          {" "}
          <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
            Precious Hairmpire
          </span>
        </h1>
        <p className="mt-4 mb-8 text-lg sm:text-xl text-center text-yellow-100 max-w-2xl drop-shadow">
          Stunning styles for every occasion. Bridal, events, and everyday glam-crafted just for you.
        </p>
        <div className="flex gap-4">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full 
              bg-gradient-to-r from-yellow-500 to-red-800 
              hover:from-yellow-600 hover:to-red-900
              text-white font-bold text-lg shadow-lg transition"
          >
            <CalendarCheck className="w-5 h-5" />
            Book Now
          </a>
          <a
            href="/view-styles"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-yellow-400 text-yellow-200 hover:bg-yellow-600/80 hover:text-white font-bold text-lg transition"
          >
            <Sparkles className="w-5 h-5" />
            View Styles
          </a>
        </div>
      </div>

      {/* Slider navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-gradient-to-r from-yellow-500 to-red-800 scale-125" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
