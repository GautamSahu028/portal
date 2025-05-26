import React from "react";
import { Button } from "../ui/button";
import { getCourse } from "@/utils/actions";
import { AttendanceRecord } from "@/utils/types";

interface AttendanceTableProps {
  results: AttendanceRecord[];
}

function AttendanceTable({ results }: AttendanceTableProps) {
  if (results.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
        <div className="text-center text-slate-400">
          No valid attendance records found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-slate-200 font-medium flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            Attendance Records ({results.length} students)
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-750">
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {results.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-750 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {record.roll_no}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {record.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        record.status === "PRESENT"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {record.time_of_record}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        record.similarity && parseFloat(record.similarity) >= 70
                          ? "bg-green-900 text-green-300"
                          : record.similarity &&
                            parseFloat(record.similarity) >= 50
                          ? "bg-yellow-900 text-yellow-300"
                          : "bg-red-900 text-red-300"
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
