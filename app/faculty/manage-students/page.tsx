import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentsByFaculty, getAttendanceByCourseId } from "@/utils/actions";
import { CourseFilter } from "@/components/faculty/student-management/CourseFilter";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import EmptyTable from "@/components/faculty/student-management/EmptyTable";

export default async function FacultyStudentsPage({
  searchParams,
}: {
  searchParams: { course?: string; date?: string };
}) {
  const studentsResult = await getStudentsByFaculty();
  const students = studentsResult.data || [];

  const allCourses = students
    .flatMap((s) => (Array.isArray(s.courses) ? s.courses : []))
    .filter((c, i, self) => self.findIndex((d) => d.id === c.id) === i);

  if (!searchParams?.course && allCourses.length > 0) {
    redirect(`?course=${allCourses[0].id}`);
  }

  const selectedCourseId = searchParams?.course!;
  const selectedDate = searchParams?.date;

  const attendanceResult = await getAttendanceByCourseId(selectedCourseId);
  const attendanceData = attendanceResult.success ? attendanceResult.data : [];

  const filteredData = selectedDate
    ? attendanceData?.filter((entry: any) => {
        try {
          if (!entry.lastDate) return false;
          const dateObj = new Date(entry.lastDate);
          if (isNaN(dateObj.getTime())) return false;

          const entryDate = dateObj.toLocaleDateString("en-CA");
          return entryDate === selectedDate;
        } catch {
          return false;
        }
      })
    : attendanceData;

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Attendance Overview</h1>
            <p className="text-slate-400 text-sm mt-1">
              Course-wise attendance details
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-4 items-center">
        <CourseFilter courses={allCourses} selectedCourse={selectedCourseId} />
        <form method="GET">
          <input type="hidden" name="course" value={selectedCourseId} />
          <form method="GET" className="flex items-center gap-2">
            <input type="hidden" name="course" value={selectedCourseId} />
            <Input
              type="date"
              name="date"
              defaultValue={selectedDate}
              className="bg-slate-700 border-slate-600 text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
              Apply
            </button>
          </form>
        </form>
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Attendance Records
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredData?.length === 0 ? (
              <EmptyTable
                message={
                  selectedDate
                    ? `No attendance data available for ${selectedDate}.`
                    : "No attendance data available."
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Roll</TableHead>
                    <TableHead className="text-slate-300">Name</TableHead>
                    <TableHead className="text-slate-300">Course</TableHead>
                    <TableHead className="text-slate-300">Semester</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Percentage</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData?.map((entry: any, index: number) => (
                    <TableRow
                      key={index}
                      className="border-slate-700 hover:bg-slate-700/30"
                    >
                      <TableCell>{entry.roll}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.course}</TableCell>
                      <TableCell>{entry.semester}</TableCell>
                      <TableCell
                        className={
                          entry.lastStatus === "PRESENT"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {entry.lastStatus}
                      </TableCell>
                      <TableCell>{entry.percentage}%</TableCell>
                      <TableCell>
                        {entry.lastDate
                          ? new Date(entry.lastDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
