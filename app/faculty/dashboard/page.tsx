import CourseRegister from "@/components/faculty/dashboard/CourseRegister";
import { getFacultyProfile } from "@/utils/actions";
import db from "@/utils/db";
import { BookOpen, User, Mail, Building, Award } from "lucide-react";

export default async function FacultyDashboard() {
  const subjects = await db.subject.findMany({
    select: { id: true, name: true, code: true },
  });
  const faculty = await getFacultyProfile();

  if (!faculty.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-8 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Profile Error</h2>
            <p className="text-red-200">
              Error Fetching Profile: {faculty.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <User className="w-10 h-10 text-white" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {faculty.data.name}
              </h1>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                  <Award className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-xs text-white/60 font-medium">
                      Designation
                    </p>
                    <p className="text-white font-semibold">
                      {faculty.data.designation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                  <Mail className="w-5 h-5 text-cyan-300" />
                  <div className="min-w-0 max-w-xs">
                    <p className="text-xs text-white/60 font-medium">Email</p>
                    <p className="text-white font-semibold text-sm break-words whitespace-normal">
                      {faculty.data.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3">
                  <Building className="w-5 h-5 text-teal-300" />
                  <div>
                    <p className="text-xs text-white/60 font-medium">
                      Department
                    </p>
                    <p className="text-white font-semibold">
                      {faculty.data.department}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Taught */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Courses Taught
                </h2>
                <p className="text-white/60 text-sm">
                  {faculty.data.courses.length} course
                  {faculty.data.courses.length !== 1 ? "s" : ""} assigned
                </p>
              </div>
            </div>
            <CourseRegister facultyId={faculty.data.id} subjects={subjects} />
          </div>

          {faculty.data.courses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white/60" />
              </div>
              <p className="text-white/60 text-lg">No courses assigned yet</p>
              <p className="text-white/40 text-sm mt-2">
                Click &quot;Register Course&quot; to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {faculty.data.courses.map((course, index) => (
                <div
                  key={course.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 group/course animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 flex items-center justify-center group-hover/course:scale-105 transition-transform duration-300">
                      <BookOpen className="w-6 h-6 text-blue-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover/course:text-blue-200 transition-colors">
                        {course.subjectCode}
                      </h3>
                      <p className="text-white/80 font-medium">
                        {course.subjectName}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover/course:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
