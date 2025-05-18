import React from "react";

const styles = [
  {
    id: 1,
    title: "Elegant Bridal Updo",
    description: "Classic and timeless updo perfect for your special day.",
    imageUrl: "/images/styles/bridal-updo.jpg", // replace with your images
  },
  {
    id: 2,
    title: "Balayage Highlights",
    description: "Soft, natural-looking highlights that add depth and dimension.",
    imageUrl: "/images/styles/balayage.jpg",
  },
  {
    id: 3,
    title: "Curly Blowout",
    description: "Voluminous curls with a glossy finish for a glamorous look.",
    imageUrl: "/images/styles/curly-blowout.jpg",
  },
  {
    id: 4,
    title: "Sleek Bob Cut",
    description: "Modern bob with sharp edges and smooth texture.",
    imageUrl: "/images/styles/sleek-bob.jpg",
  },
  // Add more styles as needed
];

export default function ViewStyles() {
  return (
    <section className="min-h-screen bg-neutral-950 py-16 px-6 sm:px-12 lg:px-24">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12">
        Our Signature Styles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {styles.map(({ id, title, description, imageUrl }) => (
          <div
            key={id}
            className="bg-neutral-900 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-yellow-500/50 cursor-pointer"
          >
            <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
              <img
                src={imageUrl}
                alt={title}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">{title}</h2>
              <p className="text-yellow-200 text-sm mb-4">{description}</p>
              <button
                className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-700 text-neutral-900 font-semibold shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition"
                onClick={() => alert(`Book style: ${title}`)}
                aria-label={`Book appointment for ${title}`}
              >
                Book Style
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
