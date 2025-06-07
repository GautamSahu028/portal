import React from "react";

interface EmptyStateProps {
  onClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="text-center p-12 border-2 border-dashed border-white/20 rounded-3xl backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-500 cursor-pointer group relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Icon with glassmorphism effect */}
        <div className="mx-auto w-32 h-32 mb-8 group-hover:scale-110 transition-transform duration-500">
          <div className="w-full h-full backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 h-16 text-white group-hover:text-blue-300 transition-colors duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Heading with gradient text */}
        <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
          Begin Attendance Tracking
        </h3>

        {/* Description */}
        <p className="text-white/70 mb-10 text-lg font-medium">
          Click to upload an image to identify and record attendees
        </p>

        {/* Upload Instruction */}
        <div className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-2xl mb-12 border border-white/20 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
          <svg
            className="w-5 h-5 text-blue-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="font-semibold">Drag & drop or click to upload</span>
        </div>

        {/* Model Info Box with enhanced glassmorphism */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl text-left hover:bg-white/8 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center mr-4 backdrop-blur-sm border border-white/20">
              <svg
                className="w-6 h-6 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white">
              Recognition Model Information
            </h4>
          </div>

          {/* Game of Thrones Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500/30 to-yellow-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-amber-500/20">
                <svg
                  className="w-4 h-4 text-amber-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="font-bold text-amber-300 text-sm uppercase tracking-wider">
                Game of Thrones Characters
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Tyrion Lannister",
                "Jon Snow",
                "Daenerys Targaryen",
                "Arya Stark",
                "Sansa Stark",
                "Bran Stark",
                "Cersei Lannister",
                "Jaime Lannister",
                "Jorah Mormont",
                "Samwell Tarly",
                "Theon Greyjoy",
                "Petyr Baelish",
                "Varys",
                "Bronn",
                "Sandor Clegane",
                "Davos Seaworth",
                "Brienne of Tarth",
                "Gilly",
                "Missandei",
                "Grey Worm",
                "Ygritte",
                "Margaery Tyrell",
                "Stannis Baratheon",
                "Melisandre",
                "Gendry",
              ].map((name) => (
                <span
                  key={name}
                  className="px-3 py-2 backdrop-blur-sm bg-amber-500/15 text-amber-200 rounded-full text-xs font-medium border border-amber-500/20 hover:bg-amber-500/25 transition-colors duration-200"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Marvel Section */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500/30 to-pink-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-red-500/20">
                <svg
                  className="w-4 h-4 text-red-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="font-bold text-red-300 text-sm uppercase tracking-wider">
                Marvel Characters
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Antman",
                "Black Panther",
                "Black Widow",
                "Captain America",
                "Captain Marvel",
                "Doctor Strange",
                "Hulk",
                "Iron Man",
                "Loki",
                "Nick Fury",
                "Spider-Man",
                "Thor",
                "Wasp",
              ].map((name) => (
                <span
                  key={name}
                  className="px-3 py-2 backdrop-blur-sm bg-red-500/15 text-red-200 rounded-full text-xs font-medium border border-red-500/20 hover:bg-red-500/25 transition-colors duration-200"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Notice Section */}
          <div className="flex items-start gap-4 p-6 backdrop-blur-sm bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm border border-yellow-500/20 flex-shrink-0">
              <svg
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-yellow-300 mb-2">
                Performance Notice
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                Processing time may vary as the model runs on a free HuggingFace
                instance. Please allow extra time for recognition processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
