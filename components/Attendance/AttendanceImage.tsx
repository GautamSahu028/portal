import React from "react";

interface AttendanceImageProps {
  imagePreview: string;
  uploadedImage: File;
}

const AttendanceImage: React.FC<AttendanceImageProps> = ({
  imagePreview,
  uploadedImage,
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileTypeIcon = (type: string) => {
    if (type.includes("image")) {
      return (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      );
    }
    return (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  };

  const detailItems = [
    {
      label: "File name",
      value: uploadedImage.name,
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Image type",
      value: uploadedImage.type.split("/")[1]?.toUpperCase() || "UNKNOWN",
      icon: getFileTypeIcon(uploadedImage.type),
    },
    {
      label: "File size",
      value: formatFileSize(uploadedImage.size),
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
      ),
    },
    {
      label: "Last modified",
      value: new Date(uploadedImage.lastModified).toLocaleString(),
      icon: (
        <svg
          className="w-4 h-4"
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
    },
    {
      label: "Upload time",
      value: new Date().toLocaleString(),
      icon: (
        <svg
          className="w-4 h-4"
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
  ];

  return (
    <div className="space-y-6 min-w-0">
      <div className="bg-muted rounded-2xl border border-border p-6 shadow-md overflow-hidden">
        <div className="relative group w-full">
          <div className="w-full overflow-hidden rounded-xl">
            <img
              src={imagePreview}
              alt="Attendance"
              className="w-full h-auto max-h-96 object-contain rounded-xl shadow-sm border border-border transition-transform group-hover:scale-[1.02]"
            />
          </div>

          <div className="absolute top-4 right-4 bg-popover text-foreground px-3 py-1 rounded-md border border-border shadow-sm">
            <span className="text-xs font-medium">
              {uploadedImage.type.split("/")[1]?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Image Details */}
      <div className="bg-muted rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/30 rounded-lg p-2 flex-shrink-0">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="text-lg font-semibold text-foreground truncate">
            File Information
          </h4>
        </div>

        <div className="grid gap-4">
          {detailItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="text-muted-foreground">{item.icon}</div>
                <span className="font-medium text-foreground">
                  {item.label}:
                </span>
              </div>
              <span className="text-right text-muted-foreground max-w-[60%] break-words">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 rounded-full border border-green-300 dark:border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Upload Successful</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceImage;
