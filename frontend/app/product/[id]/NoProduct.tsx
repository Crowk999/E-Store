export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white px-4">

      {/* Card */}
      <div className="relative max-w-md w-full text-center">

        {/* Glow background */}
        <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-3xl" />

        {/* Content box */}
        <div className="relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-10 shadow-2xl space-y-5">

          {/* Icon */}
          <div className="text-5xl">⚠️</div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-white">
            Product Not Found
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed">
            The product you are looking for doesn’t exist or may have been removed.
            Please check the URL or go back to the store.
          </p>

          {/* Button */}
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a96e] to-[#e6c98a] text-black font-semibold hover:scale-105 active:scale-95 transition"
          >
            Go Back Home
          </a>

        </div>
      </div>
    </div>
  );
}