// Footer.js
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
function Footer(props) {
  const {businessInfo} = props;
  return (
    <footer className="bg-gradient-to-r from-yellow-500 to-red-800 text-yellow-50 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          {/* Logo & Tagline */}
          <div className="flex-1 mb-6 md:mb-0">
            <div className="text-2xl font-extrabold tracking-wide mb-2">
               {businessInfo && (
                <span className="bg-white text-yellow-600 px-2 py-1 rounded">
                  {businessInfo.businessName}
                </span>
              )}
            </div>
            <p className="text-yellow-100 max-w-xs">
              Where beauty meets artistry. Bridal, color, and luxury hair experiences in Lagos.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex-1">
            <h4 className="font-semibold mb-3 text-yellow-100">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:underline text-yellow-50">Services</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:underline text-yellow-50">Portfolio</a>
              </li>
              <li>
                <a href="#team" className="hover:underline text-yellow-50">Team</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:underline text-yellow-50">Testimonials</a>
              </li>
              <li>
                <a href="#book" className="hover:underline text-yellow-50">Book Now</a>
              </li>
              <li>
                <a href="#contact" className="hover:underline text-yellow-50">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          {businessInfo && (
            <div className="flex-1">
              <h4 className="font-semibold mb-3 text-yellow-100">Contact</h4>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-yellow-200" />
                <span>{businessInfo.address}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-yellow-200" /> 
                <a href="tel:+2348051460844" className="hover:underline">{businessInfo.phone}</a>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-yellow-200" />
                <a href="mailto:" className="hover:underline">{businessInfo.email}</a>
              </div>
              <div className="flex gap-1 mt-3">
                <Instagram className="w-6 h-6 text-yellow-200" />
                <a href={businessInfo.instagram} target="_blank" className="hover:underline" rel="noopener noreferrer" aria-label="Instagram">
                {businessInfo.instagram}
                </a>
                <Facebook className="w-6 h-6 text-yellow-200" />
                <a href={businessInfo.facebook} target="_blank" className="hover:underline" rel="noopener noreferrer" aria-label="Facebook">
                {businessInfo.facebook}
                </a>
              </div>
            </div>
          )}

        </div>
        <hr className="border-yellow-200/30 mb-4" />
        <div className="text-center text-yellow-100 text-sm">
          &copy; {new Date().getFullYear()} {businessInfo && (businessInfo.businessName)}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
