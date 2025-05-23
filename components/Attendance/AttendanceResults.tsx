import React from "react";

interface AttendanceResultsProps {
  results: string[];
}

const AttendanceResults: React.FC<AttendanceResultsProps> = ({ results }) => {
  // Parse face data from the format "face_X: name (Similarity: score)"
  function parseFaceData(faceString: string) {
    // Example: "face_1: tyrion (Similarity: 0.712)"
    const regex = /face_(\d+): ([^(]+) \(Similarity: ([0-9.]+)\)/;
    const match = faceString.match(regex);

    if (match) {
      return {
        id: match[1],
        name: match[2].trim(),
        similarity: parseFloat(match[3]),
      };
    }

    return {
      id: "?",
      name: "Unknown",
      similarity: 0,
    };
  }

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        Recognized Attendees
      </h3>

      {/* Main results container with better contrast */}
      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm">
        <ul className="space-y-3">
          {results.map((faceData, index) => {
            if (!faceData.trim()) return null; // Skip empty entries

            const { id, name, similarity } = parseFaceData(faceData);
            const confidenceClass =
              similarity > 0.75
                ? "text-green-700 bg-green-50"
                : similarity > 0.6
                ? "text-yellow-700 bg-yellow-50"
                : "text-red-700 bg-red-50";

            const dotColor =
              similarity > 0.75
                ? "bg-green-500"
                : similarity > 0.6
                ? "bg-yellow-500"
                : "bg-red-500";

            return (
              <li
                key={`${id}-${index}`}
                className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {/* Student ID Badge */}
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-sm">
                  {id}
                </div>

                {/* Student Info */}
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 text-base capitalize">
                      {name}
                    </span>
                    <div
                      className={`w-2 h-2 ${dotColor} rounded-full ml-2`}
                    ></div>
                  </div>

                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${confidenceClass}`}
                  >
                    Similarity: {similarity.toFixed(3)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Legend and Summary with improved contrast */}
      <div className="mt-4 bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Confidence Legend */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-gray-700 font-medium">
                High confidence (75%+)
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span className="text-gray-700 font-medium">
                Medium confidence (60-75%)
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span className="text-gray-700 font-medium">
                Low confidence (&lt;60%)
              </span>
            </div>
          </div>

          {/* Total Count */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <p className="text-blue-800 text-sm font-semibold">
              Total Attendees: {results.filter((r) => r.trim()).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceResults;
