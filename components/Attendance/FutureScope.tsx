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
        bg: "bg-blue-100 dark:bg-blue-500/20",
        text: "text-blue-600 dark:text-blue-300",
        border: "border-blue-300 dark:border-blue-500/30",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-500/20",
        text: "text-green-600 dark:text-green-300",
        border: "border-green-300 dark:border-green-500/30",
      },
      purple: {
        bg: "bg-purple-100 dark:bg-purple-500/20",
        text: "text-purple-600 dark:text-purple-300",
        border: "border-purple-300 dark:border-purple-500/30",
      },
    };
    return colors[color];
  };

  return (
    <section className="mt-12 mb-6">
      <div className="bg-muted border border-border rounded-2xl p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="bg-gradient-to-br from-blue-200/40 to-purple-200/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl p-3 mr-4 border border-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-600 dark:text-blue-300"
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
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Coming Soon: Automated Attendance
            </h2>
            <p className="text-muted-foreground">
              Next-generation features to streamline attendance tracking
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            return (
              <div
                key={index}
                className={`bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all`}
              >
                <div
                  className={`${colors.bg} ${colors.text} rounded-lg p-3 w-fit mb-4 border ${colors.border}`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="bg-background border border-border rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-md border border-blue-200 dark:border-blue-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600 dark:text-blue-300"
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
              <h4 className="text-lg font-semibold text-foreground mb-2">
                How It Will Work
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In the next update, teachers will simply click{" "}
                <span className="text-primary font-medium">
                  "Generate Report"
                </span>{" "}
                and the system will automatically capture classroom images via
                installed IP cameras. The images will be instantly processed
                through our recognition model and attendance results will be
                displayed without any manual image uploads.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-200/40 to-purple-200/30 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-300 rounded-full border border-blue-300 dark:border-blue-500/30">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Updates in Development</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureScope;
