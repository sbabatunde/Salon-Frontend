import { useState, useEffect } from "react";
import { Scissors, Sparkles, CalendarCheck } from "lucide-react";

// Determine if a URL is an embeddable video platform
function isEmbedUrl(url) {
  return (
    url.includes("youtube.com") ||
    url.includes("youtu.be") ||
    url.includes("facebook.com") ||
    url.includes("tiktok.com") ||
    url.includes("instagram.com")
  );
}

  // Convert regular URLs into embed-ready iframe URLs
  function getEmbedUrl(url) {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId =
        url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1] || "";
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    }

    if (url.includes("facebook.com")) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&autoplay=1&mute=1`;
    }

    if (url.includes("tiktok.com")) {
      return url.replace("/video/", "/embed/"); // embed format
    }

    if (url.includes("instagram.com")) {
      return `https://www.instagram.com/embed`; // Instagram embedding is tricky; see note below
    }

    return url;
  }

export default function Hero({ videos = [], BASE_URL }) {
  const [current, setCurrent] = useState(0);

  const slides = videos.map((video) => {
    const src = video.video_url
      ? video.video_url
      : `${BASE_URL}/storage/${video.video_path.replace(/^\/+/, "")}`;
    return {
      type: isEmbedUrl(src) ? "embed" : "video",
      src,
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden"
    >
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ${
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
            <iframe
              src={getEmbedUrl(slide.src)}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
              title={`Embedded Video ${idx + 1}`}
            />
          )}
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
          <Scissors className="inline w-10 h-10 text-yellow-400 align-middle drop-shadow" />{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
            Precious Hairmpire
          </span>
        </h1>
        <p className="mt-4 mb-8 text-lg sm:text-xl text-center text-yellow-100 max-w-2xl drop-shadow">
          Stunning styles for every occasion. Bridal, events, and everyday glam—crafted just for
          you.
        </p>
        <div className="flex gap-4">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-red-800 hover:from-yellow-600 hover:to-red-900 text-white font-bold text-lg shadow-lg transition"
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

      {/* Slider dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current
                ? "bg-gradient-to-r from-yellow-500 to-red-800 scale-125"
                : "bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}


