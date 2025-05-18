import {
  X,
  Scissors,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";


export default function ViewAppointmentModal({ isOpen, onClose, appointment }) {

  function formatDateTime(datetime) {
    const date = new Date(datetime);
  
    // Get day with ordinal suffix (e.g., 1st, 2nd, 3rd)
    const day = format(date, "do", { locale: enUS });
    const monthYear = format(date, "MMMM, yyyy");
    const time = format(date, "hh:mmaaa");
  
    return `${day} of ${monthYear}. ${time}`;
  }

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen || !appointment) return null;

  const handleBackdropClick = (e) => {
    // Close only if clicked on the backdrop, not inside the modal
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="view-modal-title"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-gradient-to-b from-neutral-800 to-neutral-950 text-yellow-100 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in p-8 md:p-12 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-yellow-200 hover:text-yellow-300 focus:outline-none"
          aria-label="Close modal"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Header */}
        <h2
          id="view-modal-title"
          className="text-white text-4xl font-bold text-center mb-10 tracking-wide"
        >
          Appointment Overview
        </h2>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
          {[
            { icon: User, label: "Full Name", value: appointment.name },
            { icon: Phone, label: "Phone", value: appointment.phone },
            { icon: Mail, label: "Email", value: appointment.email },
            { icon: Scissors, label: "Service", value: appointment.service },
            { 
              icon: Calendar, 
              label: "Date & Time", 
              value: formatDateTime(`${appointment.date} ${appointment.time}`),
            },
            { icon: CheckCircle, label: "Status", value: appointment.status },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 items-start">
              <Icon className="w-6 h-6 mt-1 text-yellow-300" />
              <div>
                <p className="font-medium text-yellow-200" >{label}</p>
                
                <p className="text-lg">{value || "N/A"}</p>
              </div>
            </div>
          ))}

          {/* Notes - full width */}
          <div className="flex gap-4 items-start sm:col-span-2">
            <MessageSquare className="w-6 h-6 mt-1 text-yellow-300" />
            <div>
              <p className="font-medium text-yellow-200">Notes</p>
              <p className="whitespace-pre-wrap text-lg">
                {appointment.notes || "None"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onClose}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition"
          >
            Close
          </button>
        </div>

        {/* Animation */}
        <style>{`
          .animate-fade-in {
            animation: fadeInModal 0.3s ease-out;
          }
          @keyframes fadeInModal {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
