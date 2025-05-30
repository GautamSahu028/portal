import React from "react";
import Button from "./ui/Button";
import { AttendanceOutput } from "@/utils/types";

interface AttendanceHeaderProps {
  getTodayDate: () => string;
  handleTakeAttendance: () => void;
  isProcessing: boolean;
  uploadedImage: File | null;
  isFinalAttendance: boolean;
  upsertAttendance: (finalAttendance: AttendanceOutput[]) => void; // updated ✅
  finalAttendance: AttendanceOutput[]; // add this ✅
}

const AttendanceHeader: React.FC<AttendanceHeaderProps> = ({
  getTodayDate,
  handleTakeAttendance,
  isProcessing,
  uploadedImage,
  isFinalAttendance,
  upsertAttendance,
  finalAttendance,
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
        <Button onClick={handleClick} disabled={isProcessing}>
          {getButtonLabel()}
        </Button>
      </div>
      <p className="text-foreground mt-2">{getTodayDate()}</p>
    </div>
  );
};

export default AttendanceHeader;
