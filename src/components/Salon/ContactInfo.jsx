// ContactInfo.js
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

function ContactInfo(props) {
  // Contact Info
  const { businessInfo } = props;

  return (
    <section id="contact" className="py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-2 mb-3">
            <MapPin className="w-7 h-7 text-yellow-400" />
            <span className="uppercase tracking-widest text-yellow-300 font-semibold text-sm">
              Visit or Contact Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 to-red-800 text-transparent bg-clip-text">
              We’d Love to Hear From You
            </span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl mx-auto">
            Book a visit, ask a question, or just say hello. Our team is here to help!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="flex flex-col gap-4 text-neutral-200 text-lg">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-yellow-400" />
              {businessInfo.address}
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 text-yellow-400" />
              <a href="tel:+2348051460844" className="hover:underline">{businessInfo.phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-yellow-400" />
              <a href="mailto:info@precioushairmpire.com" className="hover:underline">{businessInfo.email}</a>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Instagram className="w-6 h-6 text-yellow-400 hover:text-yellow-300" />
              <a href="https://instagram.com/" className="hover:underline" target="_blank" rel="noopener noreferrer">
              {businessInfo.instagram}
              </a>
              <Facebook className="w-6 h-6 text-yellow-400 hover:text-yellow-300" />
              <a href="https://facebook.com/" className="hover:underline" target="_blank" rel="noopener noreferrer">
              {businessInfo.facebook}
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
          {/* Embedded Map (Google Maps iframe) */}
          <div className="rounded-xl overflow-hidden shadow-lg w-full md:w-96 h-64">
            <iframe
              title="Salon Location"
              src = {businessInfo.googleMapAddress}
              // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.546369871023!2d3.379205214753149!3d6.524379324287253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c3e5a1c0b2d%3A0x2d6e0b6b6b6b6b6b!2sLagos!5e0!3m2!1sen!2sng!4v1681234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;
