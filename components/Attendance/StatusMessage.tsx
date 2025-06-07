import React from "react";

interface StatusMessageProps {
  status: "uploaded" | "processed" | "DBuploaded" | null;
  getTodayDate: () => string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  status,
  getTodayDate,
}) => {
  if (!status) return null;

  const config = {
    uploaded: {
      color: "bg-blue-400",
      glowColor: "shadow-blue-400/50",
      borderColor: "border-blue-300/30",
      bgGradient: "from-blue-400/20 to-cyan-500/20",
      textColor: "text-blue-100",
      iconColor: "text-blue-300",
      message: `Image successfully uploaded. Click "Generate Report" to process attendance.`,
      icon: (
        <svg
          className="w-5 h-5"
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
      ),
    },
    processed: {
      color: "bg-green-400",
      glowColor: "shadow-green-400/50",
      borderColor: "border-green-300/30",
      bgGradient: "from-green-400/20 to-emerald-500/20",
      textColor: "text-green-100",
      iconColor: "text-green-300",
      message: `Attendance successfully recorded for ${getTodayDate()}`,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    DBuploaded: {
      color: "bg-green-400",
      glowColor: "shadow-green-400/50",
      borderColor: "border-green-300/30",
      bgGradient: "from-green-400/20 to-emerald-500/20",
      textColor: "text-green-100",
      iconColor: "text-green-300",
      message: `Attendance successfully uploaded for ${getTodayDate()}`,
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
  };

  const {
    color,
    glowColor,
    borderColor,
    bgGradient,
    textColor,
    iconColor,
    message,
    icon,
  } = config[status];

  return (
    <div
      className={`backdrop-blur-xl bg-gradient-to-r ${bgGradient} border ${borderColor} rounded-2xl p-6 mb-6 shadow-2xl transition-all duration-500 hover:scale-[1.01] animate-in slide-in-from-top-2`}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div
          className={`backdrop-blur-sm bg-gradient-to-br ${bgGradient} border ${borderColor} rounded-xl p-3 flex-shrink-0 shadow-lg`}
        >
          <div className={iconColor}>{icon}</div>
        </div>

        {/* Status Indicator */}
        <div className="relative">
          <div
            className={`w-4 h-4 ${color} rounded-full shadow-lg ${glowColor}`}
          />
          <div
            className={`absolute inset-0 w-4 h-4 ${color}/30 rounded-full animate-ping`}
          />
        </div>

        {/* Message */}
        <p
          className={`text-sm font-medium ${textColor} leading-relaxed tracking-wide flex-1`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};
