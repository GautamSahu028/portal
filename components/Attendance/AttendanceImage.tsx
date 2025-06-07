"use client";

import React from "react";
import Image from "next/image";

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
    <div className="space-y-8 min-w-0">
      {/* Preview Image with Glassmorphism */}
      <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-300/20 rounded-2xl p-8 shadow-2xl overflow-hidden relative group">
        {/* Image */}
        <div className="w-full overflow-hidden rounded-2xl border border-blue-300/20 backdrop-blur-sm bg-blue-400/5 shadow-inner">
          <Image
            src={imagePreview}
            alt="Attendance"
            width={800}
            height={600}
            unoptimized
            className="w-full h-auto max-h-96 object-contain rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Image Details Section with Glassmorphism */}
      <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-300/20 rounded-2xl p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="backdrop-blur-sm bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-300/30 rounded-xl p-3 flex-shrink-0 shadow-lg">
            <svg className="w-6 h-6 text-green-300" viewBox="0 0 24 24">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                  10-4.48 10-10S17.52 2 12 2zm0 18
                  c-4.41 0-8-3.59-8-8s3.59-8 8-8
                  8 3.59 8 8-3.59 8-8 8zm-1-13
                  h2v6h-2zm0 8h2v2h-2z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-blue-50/90 tracking-tight">
            File Information
          </h4>
        </div>

        {/* Details Grid */}
        <div className="grid gap-4">
          {detailItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 backdrop-blur-sm bg-blue-400/5 border border-blue-300/20 rounded-xl hover:bg-blue-400/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-blue-200/80 p-1">{item.icon}</div>
                <span className="font-semibold text-blue-100/90 text-sm">
                  {item.label}:
                </span>
              </div>
              <span className="text-right text-blue-200/70 max-w-[60%] break-words text-sm font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Success Status */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-sm bg-gradient-to-r from-green-400/20 to-emerald-500/20 text-green-200 rounded-full border border-green-300/30 shadow-lg">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400/30 rounded-full animate-ping"></div>
            </div>
            <span className="text-sm font-semibold tracking-wide">
              Upload Successful
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceImage;
