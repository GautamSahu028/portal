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
import db from "@/utils/db";
import AttendanceContainer from "@/components/faculty/student-management/AttendanceContainer";

export default async function FacultyStudentsPage({
  searchParams,
}: {
  searchParams: { course?: string; date?: string };
}) {
  const allCourses = await db.subject.findMany({
    select: { id: true, code: true, name: true },
  });
  const firstCourseId = allCourses[0]?.id;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AttendanceContainer
        initialCourseId={firstCourseId}
        allCourses={allCourses}
      />
    </div>
  );
}
