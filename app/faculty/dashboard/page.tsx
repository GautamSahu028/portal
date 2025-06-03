import CourseRegister from "@/components/faculty/dashboard/CourseRegister";
import { getFacultyProfile } from "@/utils/actions";
import db from "@/utils/db";
import { BookOpen } from "lucide-react";

export default async function FacultyDashboard() {
  const subjects = await db.subject.findMany({
    select: { id: true, name: true, code: true },
  });
  const faculty = await getFacultyProfile();

  if (!faculty.success) {
    return <div>Error Fetching Profile : {faculty.error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Header Section */}
      <div className="bg-muted border border-border rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-2">{faculty.data.name}</h1>
        <div className="text-muted-foreground space-y-1">
          <p>Designation: {faculty.data.designation}</p>
          <p>Email: {faculty.data.email}</p>
          <p>Department: {faculty.data.department}</p>
        </div>
      </div>

      {/* Courses Taught */}
      <div className="bg-muted border border-border rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Courses Taught</h2>
          </div>
          <CourseRegister facultyId={faculty.data.id} subjects={subjects} />
        </div>
        {faculty.data.courses.length === 0 ? (
          <p className="text-muted-foreground">No courses assigned.</p>
        ) : (
          <ul className="grid md:grid-cols-1 gap-4">
            {faculty.data.courses.map((course) => (
              <li
                key={course.id}
                className="bg-background border border-border rounded-xl p-4 shadow-sm"
              >
                <p className="text-lg font-medium">
                  {course.subjectCode} - {course.subjectName}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
