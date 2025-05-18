// BookingCTA.js
import { CalendarCheck, Sparkles } from "lucide-react";

function Booking() {
  return (
    <section id="booking" className="py-16 bg-gradient-to-r from-yellow-500 to-red-800 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-3">
          <Sparkles className="w-7 h-7 text-white" />
          <span className="uppercase tracking-widest text-white font-semibold text-sm">
            Ready for a New Look?
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow">
          Book Your Transformation Today
        </h2>
        <p className="text-lg md:text-xl text-yellow-100 mb-8">
          Whether it’s your wedding day or a fresh new style, our team is here to make your dream look a reality. Secure your appointment now and step into a world of beauty and confidence.
        </p>
        <a
          href="/booking"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-yellow-700 font-bold text-lg shadow-lg transition hover:bg-yellow-100"
        >
          <CalendarCheck className="w-5 h-5" />
          Book Appointment
        </a>
      </div>
    </section>
  );
}

export default Booking;
