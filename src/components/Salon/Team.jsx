// Team.js
import { User, Award } from "lucide-react";

// Replace with real team data and photos!
const team = [
  {
    name: "Amara Johnson",
    role: "Lead Bridal Stylist",
    image: "/images/team1.jpg",
    bio: "With over 10 years of experience, Amara specializes in timeless bridal looks and creative updos that last all night.",
    awards: ["Certified Master Stylist", "Bridal Beauty Award 2023"],
  },
  {
    name: "Lola Smith",
    role: "Color Specialist",
    image: "/images/team2.jpg",
    bio: "Lola brings color to life with her expertise in balayage, highlights, and vibrant transformations.",
    awards: ["Color Genius 2022"],
  },
  {
    name: "Chinwe Okafor",
    role: "Extension Expert",
    image: "/images/team3.jpg",
    bio: "Chinwe creates seamless, natural extensions for every hair type, ensuring comfort and confidence.",
    awards: [],
  },
];

function Team() {
  return (
    <section id="team" className="py-20 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-3">
            <User className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              Meet the Team
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
              Artists Behind the Beauty
            </span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
            Our talented stylists are passionate about their craft and dedicated to making every client feel extraordinary. Get to know the artists who bring your vision to life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-2xl p-8 flex flex-col items-center shadow-lg hover:shadow-yellow-400/20 transition"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-yellow-400 mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold mb-1 text-yellow-400">{member.name}</h3>
              <span className="text-yellow-200 mb-2">{member.role}</span>
              <p className="text-neutral-200 text-center mb-3">{member.bio}</p>
              {member.awards.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  {member.awards.map((award, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-900/60 text-yellow-200 text-xs font-semibold"
                    >
                      <Award className="w-4 h-4" />
                      {award}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
