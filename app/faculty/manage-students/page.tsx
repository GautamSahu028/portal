import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Calendar,
  BookOpen,
  TrendingUp,
  UserPlus,
  Download,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  UserCog,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getStudentsByFaculty, getStudentsByCourse } from "@/utils/actions";
import { CourseFilter } from "@/components/faculty/student-management/CourseFilter";

export default async function FacultyStudentsPage({
  searchParams,
}: {
  searchParams: { course?: string };
}) {
  interface FacultyStudentsPageSearchParams {
    course?: string;
  }

  const selectedCourseId: string | undefined = (
    (await searchParams) as FacultyStudentsPageSearchParams
  )?.course;

  // Fetch students from database
  let studentsResult;
  if (selectedCourseId && selectedCourseId !== "all") {
    studentsResult = await getStudentsByCourse(selectedCourseId);
  } else {
    studentsResult = await getStudentsByFaculty();
  }

  if (!studentsResult.success) {
    console.error("Error fetching students:", studentsResult.error);
    // Handle error - you might want to show an error page or message
  }

  const students = studentsResult.data || [];
  const totalStudents = studentsResult.totalStudents || 0;

  // Calculate statistics from real data
  const avgAttendance = 83; // Constant since attendance data isn't in DB
  const activeStudents = Math.floor(totalStudents * 0.8); // Assume 80% are active

  // Get unique courses taught by this faculty from all students
  const allCourses = students
    .filter((s): s is typeof s & { courses: any[] } =>
      Array.isArray((s as any).courses)
    )
    .flatMap((s) =>
      Array.isArray((s as any).courses) ? (s as any).courses : []
    );
  const uniqueCoursesMap = new Map();
  allCourses.forEach((course) => {
    uniqueCoursesMap.set(course.id, course);
  });
  const uniqueCourses = Array.from(uniqueCoursesMap.values());
  const totalCourses = uniqueCourses.length;

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-emerald-500";
    if (percentage >= 75) return "";
    return "text-rose-500";
  };

  // Generate mock attendance and grades for display purposes
  const getRandomAttendance = () => Math.floor(Math.random() * 40) + 60; // 60-100%
  const getRandomGrade = () => {
    const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"];
    return grades[Math.floor(Math.random() * grades.length)];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Student Management
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Attendance
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgAttendance}%</div>
            <p className="text-xs text-emerald-500">↗ 3.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">75%+ attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">Currently teaching</p>
          </CardContent>
        </Card>
      </div>

      {/* Student Management */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
            />
          </div>
          <CourseFilter
            courses={uniqueCourses}
            selectedCourse={selectedCourseId}
          />
        </div>

        {totalStudents === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Students Found</h3>
              <p className="text-muted-foreground text-center">
                No students are currently enrolled in your courses.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300 font-medium">
                    Roll No.
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Name
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Department
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Email
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Semester
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium">
                    Courses
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium text-right">
                    Attendance
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium text-right">
                    Grade
                  </TableHead>
                  <TableHead className="text-slate-300 font-medium text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => {
                  const mockAttendance = getRandomAttendance();
                  const mockGrade = getRandomGrade();

                  return (
                    <TableRow
                      key={student.id}
                      className="border-slate-700 hover:bg-slate-700/30"
                    >
                      <TableCell className="text-slate-300 font-mono">
                        {student.rollNumber ||
                          student.enrollmentNumber ||
                          "N/A"}
                      </TableCell>
                      <TableCell className="text-white font-medium">
                        {student.user.name}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {student.department}
                      </TableCell>
                      <TableCell className="text-slate-400">
                        {student.user.email}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {student.currentSemester || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        <div className="max-w-[200px]">
                          {"courses" in student &&
                          Array.isArray(student.courses) &&
                          student.courses.length > 0 ? (
                            <div className="text-sm">
                              {student.courses
                                .slice(0, 2)
                                .map((course, idx) => (
                                  <div key={course.id} className="truncate">
                                    {course.code} - {course.name}
                                  </div>
                                ))}
                              {student.courses.length > 2 && (
                                <div className="text-muted-foreground">
                                  +{student.courses.length - 2} more
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              No courses
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`font-medium ${getAttendanceColor(
                            mockAttendance
                          )}`}
                        >
                          {mockAttendance}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-white font-medium">
                          {mockGrade}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-slate-400 hover:text-white hover:bg-slate-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-slate-700 border-slate-600"
                          >
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-600 hover:text-white">
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-600 hover:text-white">
                              <UserCog className="h-4 w-4 mr-2" />
                              Manage Attendance
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-600 hover:text-white">
                              <FileText className="h-4 w-4 mr-2" />
                              Grades Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {totalStudents > 0 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing 1-{Math.min(10, totalStudents)} of {totalStudents}
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <div className="text-sm">
                Page 1 of {Math.ceil(totalStudents / 10)}
              </div>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
