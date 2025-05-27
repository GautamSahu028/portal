import React from "react";

interface StatusMessageProps {
  status: string;
  getTodayDate: () => string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({
  status,
  getTodayDate,
}) => {
  switch (status) {
    case "uploaded":
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
            <p className="text-slate-300 text-sm">
              Image successfully uploaded. Click "Generate Report" to process
              attendance.
            </p>
          </div>
        </div>
      );
    case "processed":
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            <p className="text-slate-300 text-sm">
              Attendance successfully recorded for {getTodayDate()}
            </p>
          </div>
        </div>
      );
    case "DBuploaded":
      return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            <p className="text-slate-300 text-sm">
              Attendance successfully uploaded for {getTodayDate()}
            </p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default StatusMessage;
