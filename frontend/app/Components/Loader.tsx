export default function Loader(){
  return (
  <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">

    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

    <div className="relative flex flex-col items-center gap-8">

      {/* Spinner System */}
      <div className="relative flex items-center justify-center">

        {/* Outer Ring */}
        <div className="absolute w-40 h-40 rounded-full border border-purple-500/30 animate-[spin_8s_linear_infinite]"></div>

        {/* Middle Ring */}
        <div className="absolute w-28 h-28 rounded-full border border-blue-500/40 animate-[spin_5s_linear_infinite_reverse]"></div>

        {/* Glow Core */}
        <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-2xl opacity-60 animate-pulse"></div>

        {/* Main Spinner */}
        <div className="w-20 h-20 rounded-full border-[3px] border-gray-700 border-t-blue-400 animate-spin"></div>

      </div>

      {/* Smart Loading Text */}
      <div className="flex flex-col items-center gap-2">

        {/* Main Text */}
        <p className="text-lg font-medium text-gray-300 tracking-wide">
          Loading
        </p>

        {/* Animated Dots */}
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></span>
        </div>

      </div>

    </div>
  </div>
);

}