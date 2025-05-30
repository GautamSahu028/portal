import React from "react";
import { cn } from "@/lib/utils";

interface StatusMessageProps {
  status: "uploaded" | "processed" | "DBuploaded" | null;
  getTodayDate: () => string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  status,
  getTodayDate,
}) => {
  if (!status) return null;

  const config = {
    uploaded: {
      color: "bg-blue-400",
      message: `Image successfully uploaded. Click "Generate Report" to process attendance.`,
    },
    processed: {
      color: "bg-green-400",
      message: `Attendance successfully recorded for ${getTodayDate()}`,
    },
    DBuploaded: {
      color: "bg-green-400",
      message: `Attendance successfully uploaded for ${getTodayDate()}`,
    },
  };

  const { color, message } = config[status];

  return (
    <div className="bg-muted border border-border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex items-center">
        <span className={cn("w-2 h-2 rounded-full mr-3", color)} />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
