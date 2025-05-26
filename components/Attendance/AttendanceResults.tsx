import React from "react";
import AttendanceTable from "./AttendanceTable";
import { AttendanceRecord } from "@/utils/types";

interface AttendanceResultsProps {
  results: AttendanceRecord[];
}

function AttendanceResults({ results }: AttendanceResultsProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-gray-200">
        Attendance Results
      </h3>
      <AttendanceTable results={results} />
    </div>
  );
}

export default AttendanceResults;
