// components/Clients/Modals/ViewClient.jsx
import {
  X,
  User,
  Phone,
  Mail,
  Scissors,
  Calendar,
  Clock,
  DollarSign,
  Package,
  FileText,
  TrendingUp,
  MessageSquare
} from "lucide-react";

export default function ViewClientModal({ isOpen, onClose, client }) {
  if (!isOpen || !client) return null;

  const financialData = client.account || {};
  const profit = financialData.profit || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border border-yellow-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-neutral-900/95 backdrop-blur-sm border-b border-yellow-800/30 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-yellow-100">Client Details</h2>
            <p className="text-yellow-300/70 text-sm">Complete client information</p>
          </div>
          <button
            onClick={onClose}
            className="text-yellow-200 hover:text-yellow-400 transition p-2 rounded-full hover:bg-yellow-900/30"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Client Info Card */}
          <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/10 rounded-xl p-6 mb-8 border border-yellow-800/30">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-600 to-amber-800 flex items-center justify-center border-4 border-yellow-500/30">
                <User className="w-12 h-12 text-yellow-200" />
              </div>
              
              {/* Client Info */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-yellow-100 mb-2">{client.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-yellow-200">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-yellow-200">
                    <Mail className="w-5 h-5 text-green-400" />
                    <span>{client.email || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-yellow-200">
                    <Scissors className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold">{client.service}</span>
                  </div>
                  <div className="flex items-center gap-3 text-yellow-200">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>{new Date(client.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="bg-green-900/30 px-4 py-2 rounded-full border border-green-700/50">
                <span className="text-green-300 font-semibold">COMPLETED</span>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Financial Information */}
            <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-green-800/30">
              <h3 className="text-xl font-bold text-green-200 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Information
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-900/20 p-4 rounded-lg border border-green-800/30">
                    <p className="text-green-300 text-sm mb-1">Amount Paid</p>
                    <p className="text-2xl font-bold text-green-200">
                      ₦{(financialData.amount_paid || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800/30">
                    <p className="text-blue-300 text-sm mb-1">Service Cost</p>
                    <p className="text-2xl font-bold text-blue-200">
                      ₦{(financialData.service_cost || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-900/20 p-4 rounded-lg border border-amber-800/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-4 h-4 text-amber-300" />
                      <p className="text-amber-300 text-sm">Material Cost</p>
                    </div>
                    <p className="text-xl font-semibold text-amber-200">
                      ₦{(financialData.material_cost || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/30">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-red-300" />
                      <p className="text-red-300 text-sm">Other Costs</p>
                    </div>
                    <p className="text-xl font-semibold text-red-200">
                      ₦{(financialData.other_cost || 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Profit/Loss */}
                <div className={`p-4 rounded-lg border ${profit >= 0 ? 'bg-green-900/20 border-green-800/30' : 'bg-red-900/20 border-red-800/30'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-5 h-5 ${profit >= 0 ? 'text-green-300' : 'text-red-300'}`} />
                      <div>
                        <p className={`text-sm ${profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                          {profit >= 0 ? 'Profit' : 'Loss'}
                        </p>
                        <p className={`text-3xl font-bold ${profit >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                          ₦{Math.abs(profit).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Payment Method</p>
                      <p className="text-gray-200 font-medium capitalize">
                        {financialData.payment_method || 'Not recorded'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              {/* Appointment Details */}
              <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-purple-800/30">
                <h3 className="text-xl font-bold text-purple-200 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Appointment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-purple-900/10 rounded">
                    <span className="text-purple-300">Appointment Time</span>
                    <span className="text-purple-100 font-semibold">{client.time}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-900/10 rounded">
                    <span className="text-purple-300">Appointment Date</span>
                    <span className="text-purple-100 font-semibold">
                      {new Date(client.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-900/10 rounded">
                    <span className="text-purple-300">Service Duration</span>
                    <span className="text-purple-100 font-semibold">--:--</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-teal-800/30">
                <h3 className="text-xl font-bold text-teal-200 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Notes & Comments
                </h3>
                <div className="bg-teal-950/20 p-4 rounded-lg border border-teal-800/20">
                  {client.notes || financialData.notes ? (
                    <p className="text-teal-100 whitespace-pre-wrap">
                      {client.notes || financialData.notes}
                    </p>
                  ) : (
                    <p className="text-teal-300/70 italic">No notes recorded</p>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-b from-neutral-800/50 to-neutral-900/30 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-gray-200 mb-4">Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Total Revenue</span>
                    <span className="text-green-300">₦{(financialData.amount_paid || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Total Costs</span>
                    <span className="text-red-300">
                      ₦{((financialData.service_cost || 0) + (financialData.material_cost || 0) + (financialData.other_cost || 0)).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className={profit >= 0 ? 'text-green-300' : 'text-red-300'}>
                        Net {profit >= 0 ? 'Profit' : 'Loss'}
                      </span>
                      <span className={profit >= 0 ? 'text-green-300' : 'text-red-300'}>
                        ₦{Math.abs(profit).toLocaleString()}
                      </span>
                    </div>
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