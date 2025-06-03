import React from "react";
import Button from "./ui/Button";
import { AttendanceOutput, AttendanceRecord } from "@/utils/types";

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
      upsertAttendance(finalAttendance); // pass finalAttendance ✅
    } else {
      handleTakeAttendance();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance System</h1>
        <div className="flex gap-x-2">
          <button
            className="hover:cursor-pointer px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-sm text-sm font-medium transition"
            onClick={() => {
              setUploadedImage(null);
              setAttendanceStatus(null);
              setFullAttendanceRecords([]);
              setFinalAttendance([]);
            }}
          >
            Clear
          </button>
          <Button onClick={handleClick} disabled={isProcessing}>
            {getButtonLabel()}
          </Button>
        </div>
      </div>
      <p className="text-foreground mt-2">{getTodayDate()}</p>
    </div>
  );
};

export default AttendanceHeader;
