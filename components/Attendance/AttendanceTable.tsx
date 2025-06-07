import React from "react";

interface AttendanceRecord {
  roll_no: string;
  name: string;
  course: string;
  status: string;
  date: string;
  time_of_record: string;
  similarity?: string;
}

function AttendanceTable({ results }: { results: AttendanceRecord[] }) {
  if (results.length === 0) {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-white/70 text-lg font-medium">
            No valid attendance records found
          </p>
          <p className="text-white/50 text-sm">
            Upload an image to process attendance data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header with glassmorphism effect */}
        <div className="px-8 py-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-xl flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mr-4 shadow-lg shadow-emerald-500/50 animate-pulse"></div>
              Attendance Records
            </h3>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white/80 text-sm font-medium">
                {results.length} students
              </span>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-white/5 to-white/10">
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
                    className="px-6 py-4 text-left text-xs font-bold text-white/90 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {results.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/10 transition-all duration-300 ease-in-out backdrop-blur-sm group"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mr-3 border border-white/20">
                        <span className="text-white text-xs font-bold">
                          {record.roll_no.slice(-2)}
                        </span>
                      </div>
                      <span className="text-white font-medium">
                        {record.roll_no}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-white font-medium">
                      {record.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-white/70">{record.course}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border shadow-lg transition-all duration-300 ${
                        record.status === "PRESENT"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-emerald-500/20"
                          : "bg-red-500/20 text-red-300 border-red-500/30 shadow-red-500/20"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-white/50 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-white/70 text-sm">
                        {record.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-white/50 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-white/70 text-sm">
                        {record.time_of_record}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-3 ${
                          record.similarity &&
                          parseFloat(record.similarity) >= 70
                            ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                            : record.similarity &&
                              parseFloat(record.similarity) >= 50
                            ? "bg-yellow-400 shadow-lg shadow-yellow-400/50"
                            : "bg-red-400 shadow-lg shadow-red-400/50"
                        }`}
                      ></div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border transition-all duration-300 ${
                          record.similarity &&
                          parseFloat(record.similarity) >= 70
                            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/20"
                            : record.similarity &&
                              parseFloat(record.similarity) >= 50
                            ? "bg-yellow-500/15 text-yellow-300 border-yellow-500/20"
                            : "bg-red-500/15 text-red-300 border-red-500/20"
                        }`}
                      >
                        {record.similarity}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with summary */}
        <div className="px-8 py-4 border-t border-white/10 bg-gradient-to-r from-white/5 to-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2 shadow-lg shadow-emerald-400/50"></div>
                <span className="text-white/70 text-sm">
                  Present:{" "}
                  {results.filter((r) => r.status === "PRESENT").length}
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-2 shadow-lg shadow-red-400/50"></div>
                <span className="text-white/70 text-sm">
                  Absent: {results.filter((r) => r.status === "ABSENT").length}
                </span>
              </div>
            </div>
            <div className="text-white/50 text-xs">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
