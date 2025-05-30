import React from "react";
import { AttendanceRecord } from "@/utils/types";

interface AttendanceTableProps {
  results: AttendanceRecord[];
}

function AttendanceTable({ results }: { results: any[] }) {
  if (results.length === 0) {
    return (
      <div className="bg-muted border border-border rounded-lg p-8 text-center text-muted-foreground">
        No valid attendance records found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-muted border border-border rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-foreground font-medium flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Attendance Records ({results.length} students)
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-foreground">
            <thead>
              <tr className="bg-muted">
                {[
                  "Roll No.",
                  "Name",
                  "Course",
                  "Status",
                  "Date",
                  "Time",
                  "Confidence",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-muted/70 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {record.roll_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {record.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        record.status === "PRESENT"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                    {record.time_of_record}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        record.similarity && parseFloat(record.similarity) >= 70
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : record.similarity &&
                            parseFloat(record.similarity) >= 50
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {record.similarity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
