import * as LucideIcons from "lucide-react";
import React from "react";

export default function Services({ services }) {

  // Filter only active services
  const activeServices = services.filter(
    (service) => service.status === "Active"
  );
  
  return (
    <section id="services" className="py-16 bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
            Our Signature Services
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="bg-neutral-900 rounded-xl p-6 flex flex-col items-center shadow-lg hover:shadow-yellow-400/20 transition"
            >
              <div className="mb-4">
                {LucideIcons[service.icon]
                  ? React.createElement(LucideIcons[service.icon], {
                      className: "w-8 h-8 text-yellow-500",
                    })
                  : null}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-400 text-center">
                {service.title}
              </h3>
              <p className="text-neutral-300 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
