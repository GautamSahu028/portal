import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="mt-8 backdrop-blur-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-300/20 rounded-2xl px-8 py-8 flex items-center justify-center gap-5 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
      {/* Enhanced Loading Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-8 h-8 border-3 border-blue-200/30 rounded-full"></div>

        {/* Spinning Ring */}
        <div className="absolute inset-0 w-8 h-8 border-3 border-t-blue-300 border-r-purple-300 border-b-transparent border-l-transparent rounded-full animate-spin"></div>

        {/* Inner Glow */}
        <div className="absolute inset-2 w-4 h-4 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full blur-sm"></div>

        {/* Center Dot */}
        <div className="absolute inset-3 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-blue-100/90 text-base font-semibold tracking-wide">
          Processing attendance data
        </span>

        {/* Animated Dots */}
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Background Pulse Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl animate-pulse"></div>
    </div>
  );
};

export default LoadingIndicator;
