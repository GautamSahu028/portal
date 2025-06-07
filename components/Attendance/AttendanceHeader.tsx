import React from "react";
import { AttendanceOutput, AttendanceRecord } from "@/utils/types";
import { Calendar } from "lucide-react";

interface AttendanceHeaderProps {
  getTodayDate: () => string;
  handleTakeAttendance: () => void;
  isProcessing: boolean;
  uploadedImage: File | null;
  isFinalAttendance: boolean;
  upsertAttendance: (finalAttendance: AttendanceOutput[]) => void;
  finalAttendance: AttendanceOutput[];
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setAttendanceStatus: React.Dispatch<
    React.SetStateAction<"uploaded" | "processed" | "DBuploaded" | null>
  >;
  setFullAttendanceRecords: React.Dispatch<
    React.SetStateAction<AttendanceRecord[]>
  >;
  setFinalAttendance: React.Dispatch<React.SetStateAction<AttendanceOutput[]>>;
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  getTodayDate,
  handleTakeAttendance,
  isProcessing,
  uploadedImage,
  isFinalAttendance,
  upsertAttendance,
  finalAttendance,
  setUploadedImage,
  setAttendanceStatus,
  setFullAttendanceRecords,
  setFinalAttendance,
}) => {
  const getButtonLabel = () => {
    if (isProcessing) return "Processing...";
    if (isFinalAttendance) return "Upload";
    if (uploadedImage) return "Generate Report";
    return "Take Attendance";
  };

  const handleClick = () => {
    if (isProcessing) return;
    if (isFinalAttendance) {
      upsertAttendance(finalAttendance);
    } else {
      handleTakeAttendance();
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden mb-8">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Calendar className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Attendance System
              </h1>
              <p className="text-white/60 text-sm font-medium">
                {getTodayDate()}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400/50 text-red-200 hover:text-red-100 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50"
              onClick={() => {
                setUploadedImage(null);
                setAttendanceStatus(null);
                setFullAttendanceRecords([]);
                setFinalAttendance([]);
              }}
            >
              Clear
            </button>

            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-blue-400/30"
              onClick={handleClick}
              disabled={isProcessing}
            >
              {getButtonLabel()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeader;
