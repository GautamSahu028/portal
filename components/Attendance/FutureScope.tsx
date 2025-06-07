import React from "react";

const FutureScope = () => {
  type FeatureColor = "blue" | "green" | "purple";
  type Feature = {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: FeatureColor;
  };

  const features: Feature[] = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "IP Camera Integration",
      description:
        "Classroom IP cameras will automatically capture attendance images without manual uploads.",
      color: "blue",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Real-Time Processing",
      description:
        "One-click attendance taking with instant image capture and recognition processing.",
      color: "green",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Automated Reports",
      description:
        "Comprehensive attendance reports generated automatically and ready for export.",
      color: "purple",
    },
  ];

  const getColorClasses = (color: FeatureColor) => {
    const colors = {
      blue: {
        bg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
        text: "text-blue-300",
        border: "border-blue-500/30",
        shadow: "shadow-blue-500/20",
        glow: "shadow-lg shadow-blue-500/25",
      },
      green: {
        bg: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
        text: "text-emerald-300",
        border: "border-emerald-500/30",
        shadow: "shadow-emerald-500/20",
        glow: "shadow-lg shadow-emerald-500/25",
      },
      purple: {
        bg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
        text: "text-purple-300",
        border: "border-purple-500/30",
        shadow: "shadow-purple-500/20",
        glow: "shadow-lg shadow-purple-500/25",
      },
    };
    return colors[color];
  };

  return (
    <section className="mt-12 mb-6">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-30 -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl opacity-30 translate-y-48 -translate-x-48"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center mb-10">
            <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl p-4 mr-6 border border-white/20 backdrop-blur-sm shadow-2xl shadow-blue-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
                Coming Soon: Automated Attendance
              </h2>
              <p className="text-white/70 text-lg">
                Next-generation features to streamline attendance tracking
              </p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {features.map((feature, index) => {
              const colors = getColorClasses(feature.color);
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl hover:bg-white/10 hover:scale-105 transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Card background gradient */}
                  <div
                    className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`${colors.bg} ${colors.text} rounded-2xl p-4 w-fit mb-6 border ${colors.border} backdrop-blur-sm ${colors.glow} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-white mb-4 text-xl group-hover:text-blue-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Floating particles for each card */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 ${colors.text} rounded-full animate-pulse`}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${2 + Math.random()}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Info Box */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl mb-8 hover:bg-white/8 transition-all duration-300">
            <div className="flex items-start gap-6">
              <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 p-4 rounded-2xl border border-blue-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/20 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-300"
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
              <div>
                <h4 className="text-xl font-bold text-white mb-4">
                  How It Will Work
                </h4>
                <p className="text-white/80 leading-relaxed text-lg">
                  In the next update, teachers will simply click{" "}
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-300 rounded-lg font-bold border border-blue-500/20 backdrop-blur-sm">
                    &quot;Generate Report&quot;
                  </span>{" "}
                  and the system will automatically capture classroom images via
                  installed IP cameras. The images will be instantly processed
                  through our recognition model and attendance results will be
                  displayed without any manual image uploads.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Coming Soon Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl shadow-blue-500/20 hover:shadow-purple-500/20 transition-all duration-500 group">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-white font-bold text-lg tracking-wide group-hover:text-blue-100 transition-colors duration-300">
                Updates in Development
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-4 h-4 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureScope;
