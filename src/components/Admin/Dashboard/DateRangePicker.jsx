import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, CalendarRange, Filter } from "lucide-react";

export default function DateRangePicker({ dateRange, onRangeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [localRange, setLocalRange] = useState({
    period: dateRange.period,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    customStart: dateRange.startDate.toISOString().split('T')[0],
    customEnd: dateRange.endDate.toISOString().split('T')[0]
  });
  
  const dropdownRef = useRef(null);

  const periods = [
    { id: 'daily', label: 'Daily', range: 'Today' },
    { id: 'weekly', label: 'Weekly', range: 'Last 7 days' },
    { id: 'monthly', label: 'Monthly', range: 'Last 30 days' },
    { id: 'quarterly', label: 'Quarterly', range: 'Last 3 months' },
    { id: 'annual', label: 'Annual', range: 'Last 12 months' },
    { id: 'custom', label: 'Custom', range: 'Select range' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePeriodSelect = (period) => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (period) {
      case 'daily':
        startDate = today;
        break;
      case 'weekly':
        startDate.setDate(today.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(today.getMonth() - 1);
        break;
      case 'quarterly':
        startDate.setMonth(today.getMonth() - 3);
        break;
      case 'annual':
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case 'custom':
        setLocalRange(prev => ({ ...prev, period: 'custom' }));
        return;
    }

    setLocalRange({
      period,
      startDate,
      endDate,
      customStart: startDate.toISOString().split('T')[0],
      customEnd: endDate.toISOString().split('T')[0]
    });

    onRangeChange({ period, startDate, endDate });
    setIsOpen(false);
  };

  const handleCustomRangeApply = () => {
    const startDate = new Date(localRange.customStart);
    const endDate = new Date(localRange.customEnd);
    
    setLocalRange(prev => ({
      ...prev,
      startDate,
      endDate
    }));

    onRangeChange({
      period: 'custom',
      startDate,
      endDate
    });
    
    setIsOpen(false);
  };

  const getPeriodLabel = () => {
    const period = periods.find(p => p.id === localRange.period);
    return period ? period.label : 'Select Range';
  };

  const getRangeText = () => {
    if (localRange.period === 'custom') {
      return `${localRange.customStart} to ${localRange.customEnd}`;
    }
    const period = periods.find(p => p.id === localRange.period);
    return period?.range || '';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-yellow-200 rounded-lg hover:bg-neutral-700 transition border border-yellow-700/30"
      >
        <CalendarRange className="w-4 h-4" />
        <span className="text-sm font-medium">{getPeriodLabel()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-neutral-800 rounded-xl shadow-2xl border border-yellow-700/30 z-50">
          <div className="p-3">
            <p className="text-xs text-yellow-200/60 mb-2 px-2">Quick Select</p>
            <div className="grid grid-cols-2 gap-1">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => handlePeriodSelect(period.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    localRange.period === period.id
                      ? 'bg-yellow-600 text-white'
                      : 'text-yellow-200/70 hover:bg-neutral-700'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {localRange.period === 'custom' && (
            <div className="p-3 border-t border-yellow-700/30">
              <p className="text-xs text-yellow-200/60 mb-3">Custom Range</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-yellow-200/60 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={localRange.customStart}
                    onChange={(e) => setLocalRange(prev => ({ ...prev, customStart: e.target.value }))}
                    className="w-full p-2 bg-neutral-700 text-yellow-100 rounded-lg border border-yellow-700/30 focus:border-yellow-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-yellow-200/60 mb-1">End Date</label>
                  <input
                    type="date"
                    value={localRange.customEnd}
                    onChange={(e) => setLocalRange(prev => ({ ...prev, customEnd: e.target.value }))}
                    className="w-full p-2 bg-neutral-700 text-yellow-100 rounded-lg border border-yellow-700/30 focus:border-yellow-500 outline-none text-sm"
                  />
                </div>
                <button
                  onClick={handleCustomRangeApply}
                  className="w-full px-4 py-2 bg-gradient-to-r from-yellow-600 to-red-800 text-white rounded-lg hover:from-yellow-700 hover:to-red-900 transition text-sm font-medium"
                >
                  Apply Range
                </button>
              </div>
            </div>
          )}

          <div className="p-3 border-t border-yellow-700/30">
            <p className="text-xs text-yellow-200/60">
              {getRangeText()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}