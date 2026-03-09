import {
  X,
  User,
  Instagram,
  Mail,
  Award,
  Sparkles,
  Star,
  Calendar,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function ViewStylist({ isOpen, onClose, stylist }) {
  if (!isOpen || !stylist) return null;

  const getSpecializationColor = (spec) => {
    const colors = {
      'Bridal': 'pink',
      'Color': 'purple',
      'Extension': 'blue',
      'Men\'s': 'green',
      'Texture': 'orange',
      'Editorial': 'red',
    };
    return colors[spec] || 'yellow';
  };

  const getSpecializationIcon = (spec) => {
    const icons = {
      'Bridal': '👑',
      'Color': '🎨',
      'Extension': '💫',
      'Men\'s': '💇',
      'Texture': '✨',
      'Editorial': '📸',
    };
    return icons[spec] || '⭐';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-yellow-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900/95 backdrop-blur-sm border-b border-yellow-800/30 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-yellow-100">Stylist Profile</h2>
            <p className="text-yellow-300/70 text-sm">Complete stylist information</p>
          </div>
          <button
            onClick={onClose}
            className="text-yellow-200 hover:text-yellow-400 transition p-2 rounded-full hover:bg-yellow-900/30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/10 rounded-xl p-8 mb-8 border border-yellow-800/30">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600 to-red-800 flex items-center justify-center border-4 border-yellow-500/30 overflow-hidden">
                  {stylist.image ? (
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-yellow-200" />
                  )}
                </div>
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-neutral-900 ${
                  stylist.is_active ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-yellow-100 mb-2">{stylist.name}</h3>
                <p className="text-xl text-amber-400 mb-4">{stylist.role}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stylist.instagram && (
                    <div className="flex items-center justify-center md:justify-start gap-2 text-pink-400">
                      <Instagram className="w-5 h-5" />
                      <span>{stylist.instagram}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center md:justify-start gap-2 text-blue-400">
                    <Mail className="w-5 h-5" />
                    <span>{stylist.email}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-4 py-2 rounded-full border ${
                stylist.is_active 
                  ? 'bg-green-900/30 text-green-300 border-green-700/50' 
                  : 'bg-red-900/30 text-red-300 border-red-700/50'
              }`}>
                <div className="flex items-center gap-2">
                  {stylist.is_active ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  <span className="font-semibold">{stylist.is_active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Bio & Specializations */}
            <div className="space-y-6">
              {/* Bio */}
              <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-purple-800/30">
                <h3 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Biography
                </h3>
                <p className="text-purple-100 leading-relaxed">
                  {stylist.bio}
                </p>
              </div>

              {/* Specializations */}
              {stylist.specializations?.length > 0 && (
                <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-blue-800/30">
                  <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {stylist.specializations.map((spec, index) => {
                      const color = getSpecializationColor(spec);
                      return (
                        <span
                          key={index}
                          className={`px-4 py-2 bg-${color}-900/30 text-${color}-300 rounded-full text-sm font-medium border border-${color}-700/30 flex items-center gap-2`}
                        >
                          <span>{getSpecializationIcon(spec)}</span>
                          {spec}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Awards & Details */}
            <div className="space-y-6">
              {/* Awards */}
              {stylist.awards?.length > 0 && (
                <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-amber-800/30">
                  <h3 className="text-xl font-bold text-amber-200 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Awards & Recognition
                  </h3>
                  <div className="space-y-3">
                    {stylist.awards.map((award, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-amber-900/10 rounded-lg border border-amber-800/20"
                      >
                        <Star className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <span className="text-amber-200">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-gray-200 mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-gray-200 font-medium">
                      {new Date(stylist.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-gray-200 font-medium">
                      {new Date(stylist.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <span className="text-gray-400">Display Order</span>
                    <span className="text-gray-200 font-medium">#{stylist.display_order}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-neutral-900/95 backdrop-blur-sm border-t border-yellow-800/30 p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-700 to-amber-800 text-white font-bold hover:from-yellow-800 hover:to-amber-900 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}