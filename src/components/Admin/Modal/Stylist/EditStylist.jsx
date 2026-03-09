import { useState, useEffect, useRef } from "react";
import { 
  X, 
  Save, 
  User, 
  Mail, 
  Instagram, 
  Award, 
  Sparkles,
  Image as ImageIcon,
  Plus,
  Trash2
} from "lucide-react";
import { toast } from "react-toastify";

export default function EditStylist({ isOpen, onClose, stylist, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    instagram: "",
    bio: "",
    awards: [],
    specializations: [],
    is_active: true,
    display_order: 0,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [newAward, setNewAward] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const specializationOptions = [
    'Bridal', 'Color', 'Extension', 'Men\'s', 'Texture', 'Editorial'
  ];

  useEffect(() => {
    if (stylist) {
      // Parse awards and specializations if they're strings
      let awards = stylist.awards || [];
      let specializations = stylist.specializations || [];
      
      if (typeof awards === 'string') {
        try { awards = JSON.parse(awards); } catch { awards = []; }
      }
      if (typeof specializations === 'string') {
        try { specializations = JSON.parse(specializations); } catch { specializations = []; }
      }

      setFormData({
        name: stylist.name || "",
        role: stylist.role || "",
        email: stylist.email || "",
        instagram: stylist.instagram || "",
        bio: stylist.bio || "",
        awards: Array.isArray(awards) ? awards : [],
        specializations: Array.isArray(specializations) ? specializations : [],
        is_active: stylist.is_active ?? true,
        display_order: stylist.display_order || 0,
        image: null
      });
      setImagePreview(stylist.image || null);
    }
  }, [stylist]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addAward = () => {
    if (newAward.trim()) {
      setFormData(prev => ({
        ...prev,
        awards: [...prev.awards, newAward.trim()]
      }));
      setNewAward("");
    }
  };

  const removeAward = (index) => {
    setFormData(prev => ({
      ...prev,
      awards: prev.awards.filter((_, i) => i !== index)
    }));
  };

  const toggleSpecialization = (spec) => {
    setFormData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for image upload
      const submitData = new FormData();
      
      // Add all basic fields
      submitData.append('name', formData.name);
      submitData.append('role', formData.role);
      submitData.append('email', formData.email);
      submitData.append('bio', formData.bio);
      submitData.append('is_active', formData.is_active ? '1' : '0');
      submitData.append('display_order', formData.display_order.toString());
      
      if (formData.instagram) {
        submitData.append('instagram', formData.instagram);
      }
      
      // Handle awards - send as individual items with array syntax
      if (formData.awards && formData.awards.length > 0) {
        formData.awards.forEach((award, index) => {
          submitData.append(`awards[${index}]`, award);
        });
      } else {
        submitData.append('awards', '[]');
      }
      
      // Handle specializations - send as individual items with array syntax
      if (formData.specializations && formData.specializations.length > 0) {
        formData.specializations.forEach((spec, index) => {
          submitData.append(`specializations[${index}]`, spec);
        });
      } else {
        submitData.append('specializations', '[]');
      }
      
      // Handle image
      if (formData.image) {
        submitData.append('image', formData.image);
      }
      
      // For update, use POST with _method=PUT (Laravel method spoofing)
      if (stylist?.id) {
        submitData.append('_method', 'PUT');
        await onSave(submitData, stylist.id);
      } else {
        await onSave(submitData);
      }
      
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Failed to save stylist');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-neutral-900 border border-yellow-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-neutral-900 border-b border-yellow-700/50 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-yellow-100 text-2xl font-extrabold">
                {stylist?.id ? 'Edit Stylist' : 'Create Stylist'}
              </h2>
              <p className="text-yellow-300/70 text-sm mt-1">
                {stylist?.id ? `Editing ${stylist.name}` : 'Add a new team member'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-yellow-200 hover:text-yellow-400 transition p-2 rounded-full hover:bg-neutral-800"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600 to-red-800 flex items-center justify-center border-4 border-yellow-500/30 overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-yellow-200" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-yellow-600 rounded-full text-white hover:bg-yellow-700 transition shadow-lg"
                >
                  <ImageIcon size={16} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-400">Click the icon to upload a profile image (Max 5MB)</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-300 text-sm font-medium mb-2">Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-yellow-400" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-yellow-700 text-yellow-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-300 text-sm font-medium mb-2">Role *</label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-3 w-5 h-5 text-amber-400" />
                  <input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., Lead Bridal Stylist"
                    className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-amber-700 text-amber-100 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-blue-300 text-sm font-medium mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-blue-700 text-blue-100 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-pink-300 text-sm font-medium mb-2">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-3 w-5 h-5 text-pink-400" />
                  <input
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="pl-10 pr-3 py-3 w-full rounded-lg bg-neutral-800 border border-pink-700 text-pink-100 placeholder-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Bio *</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the stylist's expertise, experience, and style..."
                className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-purple-700 text-purple-100 placeholder-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Specializations */}
            <div>
              <label className="block text-green-300 text-sm font-medium mb-2">Specializations</label>
              <div className="flex flex-wrap gap-2 p-3 bg-neutral-800/50 rounded-lg border border-green-800/30">
                {specializationOptions.map(spec => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => toggleSpecialization(spec)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                      formData.specializations.includes(spec)
                        ? 'bg-green-600 text-white'
                        : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <label className="block text-amber-300 text-sm font-medium mb-2">Awards</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    value={newAward}
                    onChange={(e) => setNewAward(e.target.value)}
                    placeholder="Enter award name"
                    className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 border border-amber-700 text-amber-100 placeholder-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAward())}
                  />
                  <button
                    type="button"
                    onClick={addAward}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {formData.awards.map((award, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-amber-900/20 rounded-lg border border-amber-800/30"
                    >
                      <span className="text-amber-200 text-sm">{award}</span>
                      <button
                        type="button"
                        onClick={() => removeAward(index)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status & Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg border border-gray-700">
                <label className="text-gray-300 text-sm font-medium cursor-pointer">
                  Active Status
                </label>
                <input
                  name="is_active"
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-5 h-5 rounded bg-neutral-700 border-2 border-yellow-600 text-yellow-500 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Display Order</label>
                <input
                  name="display_order"
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 bg-neutral-900 border-t border-yellow-700/30 p-6 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-600 to-red-800 text-white font-bold hover:from-yellow-700 hover:to-red-900 transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Stylist
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}