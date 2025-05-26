import {
  AttendanceOutput,
  AttendanceRecord,
  FacultyCourse,
} from "@/utils/types";

export const parseAttendanceData = (
  results: string[],
  courseCode: string
): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const currentDate = new Date().toLocaleDateString("en-US");
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  results.forEach((result, index) => {
    // Skip empty strings
    if (!result.trim()) return;

    // Extract face data - format: "face_1: 2211507-Cersei Lannister (Similarity: 0.667)"
    const faceMatch = result.match(
      /face_\d+:\s*(.+?)(?:\s*\(Similarity:\s*([\d.]+)\))?$/
    );

    if (faceMatch) {
      const faceData = faceMatch[1].trim();
      const similarity = faceMatch[2];

      // Skip unknown faces
      if (faceData.toLowerCase() === "unknown") {
        return;
      }

      // Extract roll number and name - format: "2211507-Cersei Lannister"
      const rollNameMatch = faceData.match(/^(\d+)-(.+)$/);

      if (rollNameMatch) {
        const rollNo = rollNameMatch[1];
        const name = rollNameMatch[2];

        // Extract department and semester from roll number
        // Assuming format like 2211507 where 22 is year, 115 is department code, 07 is sequence
        //   const department = getDepartmentFromRollNo(rollNo);
        //   const semester = getSemesterFromRollNo(rollNo);

        records.push({
          roll_no: rollNo,
          name: name,
          course: courseCode, // Will be populated from actual course data
          date: currentDate,
          status: "PRESENT",
          time_of_record: currentTime,
          similarity: similarity
            ? `${(parseFloat(similarity) * 100).toFixed(1)}%`
            : "N/A",
        });
      }
    }
  });

  return records;
};

export function getCombinedAttendance(
  courses: FacultyCourse[],
  attendanceResults: AttendanceRecord[]
): {
  finalAttendance: AttendanceOutput[];
  fullAttendanceRecords: AttendanceRecord[];
} {
  const attendanceMap = new Map<string, AttendanceRecord>();
  const fullAttendanceRecords: AttendanceRecord[] = [];
  const finalAttendance: AttendanceOutput[] = [];

  // Group attendance records by course for quick access
  const courseAttendanceByCode = new Map<string, AttendanceRecord[]>();

  for (const record of attendanceResults) {
    const key = `${record.roll_no}_${record.course}`;
    attendanceMap.set(key, record);

    if (!courseAttendanceByCode.has(record.course)) {
      courseAttendanceByCode.set(record.course, []);
    }
    courseAttendanceByCode.get(record.course)!.push(record);

    // Push present students to finalAttendance, we'll fill studentId/courseId later
    finalAttendance.push({
      studentId: "", // to fill
      courseId: "", // to fill
      date: new Date(record.date),
      status: "PRESENT",
    });

    // Push present students attendanceRecords as is
    fullAttendanceRecords.push(record);
  }

  // Helper: get first attendance record for a course (to get date/time_of_record)
  function getSampleRecordForCourse(
    courseCode: string
  ): AttendanceRecord | undefined {
    const records = courseAttendanceByCode.get(courseCode);
    return records && records.length > 0 ? records[0] : undefined;
  }

  // Fill studentId and courseId for present students and add absent students
  for (const course of courses) {
    const sampleRecord = getSampleRecordForCourse(course.code);
    const refDate = sampleRecord ? sampleRecord.date : new Date().toISOString();
    const refTime = sampleRecord ? sampleRecord.time_of_record : "N/A";

    for (const student of course.enrolledStudents) {
      const key = `${student.rollNumber}_${course.code}`;
      const record = attendanceMap.get(key);

      if (record) {
        // Find and update present record in finalAttendance
        const match = finalAttendance.find(
          (a) =>
            a.status === "PRESENT" &&
            a.date.toISOString() === new Date(record.date).toISOString() &&
            record.roll_no === student.rollNumber &&
            record.course === course.code &&
            a.studentId === "" && // to avoid duplicates
            a.courseId === ""
        );
        if (match) {
          match.studentId = student.id;
          match.courseId = course.id;
        }
      } else {
        // Absent student
        finalAttendance.push({
          studentId: student.id,
          courseId: course.id,
          date: new Date(refDate),
          status: "ABSENT",
        });

        fullAttendanceRecords.push({
          roll_no: student.rollNumber,
          name: student.user.name,
          course: course.code,
          date: refDate,
          status: "ABSENT",
          time_of_record: refTime,
          similarity: "N/A",
        });
      }
    }
  }

  return {
    finalAttendance,
    fullAttendanceRecords,
  };
}
