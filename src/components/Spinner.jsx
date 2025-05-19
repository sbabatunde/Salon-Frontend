// Spinner component as above
export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full">
      <span className="relative flex h-16 w-16">
        {/* Rotating border spinner */}
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-16 w-16 text-yellow-500"
            viewBox="0 0 64 64"
            fill="none"
          >
            <circle
              className="opacity-20"
              cx="32"
              cy="32"
              r="28"
              stroke="#f59e42"
              strokeWidth="8"
            />
            <path
              d="M60 32c0-15.464-12.536-28-28-28"
              stroke="url(#spinner-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="spinner-gradient" x1="32" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fde047" />
                <stop offset="1" stopColor="#f59e42" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </span>
      <span className="mt-4 text-yellow-300 font-semibold tracking-wide">Loading styles...</span>
    </div>
  );
}
