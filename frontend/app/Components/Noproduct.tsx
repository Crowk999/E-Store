export default function NoProducts() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

      <div className="relative flex flex-col items-center gap-8 text-center px-6">

        {/* Glowing Icon */}
        <div className="relative flex items-center justify-center">

          {/* Outer Glow Ring */}
          <div className="absolute w-32 h-32 rounded-full bg-purple-500/10 blur-2xl"></div>

          {/* Icon Circle */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-gray-700">

            {/* X Icon */}
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col gap-2">

          <h2 className="text-xl font-semibold text-gray-200">
            Failed to load products
          </h2>

          <p className="text-gray-500 text-sm max-w-sm">
            Something went wrong while fetching data. It might be a network issue or server problem.
          </p>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-2">

          {/* Retry Button */}
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition"
          >
            Retry
          </button>

          {/* Optional Secondary */}
        </div>

      </div>
    </div>
  );
}