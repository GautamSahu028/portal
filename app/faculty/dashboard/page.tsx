import { getFacultyProfile } from "@/utils/actions";
import { CalendarDays, BookOpen, Megaphone } from "lucide-react";

export default async function FacultyDashboard() {
  const faculty = await getFacultyProfile();

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 space-y-8">
      {/* Header Section */}
      <div className="bg-muted border border-border rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-2">{faculty.name}</h1>
        <div className="text-muted-foreground space-y-1">
          <p>Designation: {faculty.designation}</p>
          <p>Employee ID: {faculty.employeeId}</p>
          <p>Email: {faculty.email}</p>
          <p>Department: {faculty.department}</p>
        </div>
      </div>

      {/* Courses Taught */}
      <div className="bg-muted border border-border rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Courses Taught</h2>
        </div>
        {faculty.courses.length === 0 ? (
          <p className="text-muted-foreground">No courses assigned.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-4">
            {faculty.courses.map((course) => (
              <li
                key={course.id}
                className="bg-background border border-border rounded-xl p-4 shadow-sm"
              >
                <p className="text-lg font-medium">
                  {course.code} - {course.name}
                </p>
                {course.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Announcements */}
      <div className="bg-muted border border-border rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Recent Announcements</h2>
        </div>
        {faculty.announcements.length === 0 ? (
          <p className="text-muted-foreground">No announcements posted.</p>
        ) : (
          <ul className="space-y-4">
            {faculty.announcements.map((a) => (
              <li
                key={a.id}
                className="border border-border bg-background rounded-xl p-4 shadow-sm"
              >
                <h4 className="text-lg font-semibold">{a.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {a.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Posted on {new Date(a.postedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
