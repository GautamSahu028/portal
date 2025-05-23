import React from "react";

interface AttendanceImageProps {
  imagePreview: string;
  uploadedImage: File;
}

const AttendanceImage: React.FC<AttendanceImageProps> = ({
  imagePreview,
  uploadedImage,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">
        Image Preview
      </h3>

      {/* Image container with better border and shadow */}
      <div className="border-2 border-gray-200 rounded-lg p-3 bg-white shadow-sm">
        <img
          src={imagePreview}
          alt="Attendance"
          className="max-w-full h-auto rounded-md shadow-sm"
        />
      </div>

      {/* Image details with improved contrast and spacing */}
      <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
          Image Details
        </h4>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">File name:</span>
            <span className="text-gray-900 break-all">
              {uploadedImage.name}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Image type:</span>
            <span className="text-gray-900 uppercase">
              {uploadedImage.type}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Size:</span>
            <span className="text-gray-900">
              {(uploadedImage.size / 1024).toFixed(2)} KB
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Last modified:</span>
            <span className="text-gray-900">
              {new Date(uploadedImage.lastModified).toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Upload time:</span>
            <span className="text-gray-900">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceImage;
