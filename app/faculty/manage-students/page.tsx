import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStudentsByFaculty, getAttendanceByCourseId } from "@/utils/actions";
import { CourseFilter } from "@/components/faculty/student-management/CourseFilter";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import EmptyTable from "@/components/faculty/student-management/EmptyTable";
import EditableAttendanceTable from "@/components/faculty/student-management/EditableAttendanceTable";
import { DatePicker } from "@/components/faculty/student-management/DatePicker";
import FilterControls from "@/components/faculty/student-management/FilterControls";

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

  if (!(await searchParams)?.course && allCourses.length > 0) {
    redirect(`?course=${allCourses[0].id}`);
  }

  const selectedCourseId = (await searchParams)?.course!;
  const selectedDate = (await searchParams)?.date;

  const attendanceResult = await getAttendanceByCourseId(selectedCourseId);
  const attendanceData = attendanceResult.success ? attendanceResult.data : [];
  // console.log(attendanceData);

  // const filteredData: string | any[] = [];
  const filteredData = selectedDate
    ? attendanceData?.filter((entry: any) => {
        try {
          if (!entry.date) return false; // ✅ Use 'date' instead of 'lastDate'
          const dateObj = new Date(entry.date);
          if (isNaN(dateObj.getTime())) return false;

          const entryDate = dateObj.toLocaleDateString("en-CA");
          return entryDate === selectedDate;
        } catch {
          return false;
        }
      })
    : attendanceData;

  const sortedData = filteredData?.sort((a, b) => {
    const rollA = parseInt(a.roll) || 0;
    const rollB = parseInt(b.roll) || 0;
    return rollA - rollB;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b bg-muted px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Attendance Overview</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Course-wise attendance details
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterControls
        selectedCourseId={selectedCourseId}
        allCourses={allCourses}
        selectedDate={selectedDate}
      />

      {/* Table */}
      <div className="px-6 pb-6">
        <Card className="bg-muted border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Attendance Records</CardTitle>
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
                  <TableRow className="border-border">
                    <TableHead>Roll</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <EditableAttendanceTable data={sortedData || []} />
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
