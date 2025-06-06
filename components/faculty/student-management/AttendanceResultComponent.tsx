"use client";
import { useEffect, useState } from "react";
import { AttendanceByDateItem, FacultyProfile } from "@/utils/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  CalendarDays,
  Users,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Search,
  Calendar,
} from "lucide-react";
import axios from "axios";
import EmptyTable from "./EmptyTable";

export interface AttendanceResultComponentProps {
  faculty: FacultyProfile;
}

interface SubjectPreview {
  id: string;
  code: string;
  name: string;
}

const AttendanceResultComponent: React.FC<AttendanceResultComponentProps> = ({
  faculty,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectPreview[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [attendanceData, setAttendanceData] = useState<AttendanceByDateItem[]>(
    []
  );
  const [filteredAttendanceData, setFilteredAttendanceData] = useState<
    AttendanceByDateItem[]
  >([]);

  useEffect(() => {
    const allSubjects = faculty.courses.map((course) => ({
      id: course.id,
      code: course.subjectCode,
      name: course.subjectName,
    }));
    setSubjects(allSubjects);
  }, [faculty]);

  useEffect(() => {
    const filtered = attendanceData.filter((item) => {
      const itemDateOnly = item.date.split("T")[0];
      return itemDateOnly === selectedDate;
    });
    setFilteredAttendanceData(filtered);
  }, [selectedDate, attendanceData]);

  const handleLogSubject = async () => {
    const selected = subjects.find((s) => s.id === selectedSubjectId);
    if (!selected) {
      console.log("No subject selected.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/attendance/by-course", {
        courseId: selected.id,
      });

      if (res.data.success) {
        const allData: AttendanceByDateItem[] = res.data.data;
        setAttendanceData(allData);

        const filtered = allData.filter((item) => {
          const itemDateOnly = item.date.split("T")[0];
          return itemDateOnly === selectedDate;
        });

        setFilteredAttendanceData(filtered);
      } else {
        console.error("API Error:", res.data.error);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PRESENT":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "ABSENT":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "LATE":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-emerald-500/20 text-emerald-200 border-emerald-500/30";
      case "ABSENT":
        return "bg-red-500/20 text-red-200 border-red-500/30";
      case "LATE":
        return "bg-yellow-500/20 text-yellow-200 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-200 border-gray-500/30";
    }
  };

  const getAttendanceColor = (percentage: string) => {
    const percent = parseFloat(percentage);
    if (percent >= 80) return "text-emerald-400";
    if (percent >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const presentCount = filteredAttendanceData.filter(
    (item) => item.status === "PRESENT"
  ).length;
  const totalCount = filteredAttendanceData.length;
  const attendanceRate =
    totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <CalendarDays className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Attendance Records
              </h1>
              <p className="text-white/60 text-sm">
                {selectedDate
                  ? formatDate(selectedDate)
                  : "Select a date to view records"}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">
                Subject
              </label>
              <Select
                value={selectedSubjectId}
                onValueChange={setSelectedSubjectId}
              >
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 focus:border-blue-400/50 focus:ring-blue-400/20">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/20">
                  {subjects.map((subject) => (
                    <SelectItem
                      key={subject.id}
                      value={subject.id}
                      className="text-white hover:bg-white/10 focus:bg-white/10"
                    >
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-white/80 text-sm font-medium">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-white/60" />
                <input
                  type="date"
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/60 focus:border-blue-400/50 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-end mt-6">
              <Button
                onClick={handleLogSubject}
                disabled={!selectedSubjectId || loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-10"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    {!selectedSubjectId ? "Select Subject" : "Get Attendance"}
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {selectedSubject && filteredAttendanceData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Subject</p>
                <p className="text-white font-semibold">
                  {selectedSubject.code}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Students</p>
                <p className="text-white font-semibold">{totalCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Present</p>
                <p className="text-white font-semibold">{presentCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Attendance Rate</p>
                <p
                  className={`font-semibold ${getAttendanceColor(
                    attendanceRate
                  )}`}
                >
                  {attendanceRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Records */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-teal-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Student Records</h2>
              <p className="text-white/60 text-sm">
                {filteredAttendanceData.length} student
                {filteredAttendanceData.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {filteredAttendanceData.length === 0 ? (
            <EmptyTable
              loading={loading}
              title="No Records Found"
              message="Select a subject and date to view attendance records"
            />
          ) : (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {/* Table Header */}
                  <thead>
                    <tr className="bg-white/10 border-b border-white/20">
                      <th className="text-left py-4 px-6 text-white font-semibold text-sm">
                        Roll No.
                      </th>
                      <th className="text-left py-4 px-6 text-white font-semibold text-sm">
                        Name
                      </th>
                      <th className="text-left py-4 px-6 text-white font-semibold text-sm">
                        Course
                      </th>
                      <th className="text-center py-4 px-6 text-white font-semibold text-sm">
                        Semester
                      </th>
                      <th className="text-center py-4 px-6 text-white font-semibold text-sm">
                        Attendance
                      </th>
                      <th className="text-center py-4 px-6 text-white font-semibold text-sm">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-white font-semibold text-sm">
                        Date
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {[...filteredAttendanceData]
                      .sort((a, b) => a.roll.localeCompare(b.roll))
                      .map((item, index) => (
                        <tr
                          key={`${item.studentId}-${item.courseId}-${item.date}`}
                          className="border-b border-white/10 hover:bg-white/8 transition-all duration-200 group animate-fadeInUp"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          {/* Roll Number */}
                          <td className="py-4 px-6">
                            <span className="text-white font-semibold">
                              {item.roll}
                            </span>
                          </td>

                          {/* Name */}
                          <td className="py-4 px-6">
                            <p className="text-white font-semibold">
                              {item.name}
                            </p>
                          </td>

                          {/* Course */}
                          <td className="py-4 px-6">
                            <p className="text-white font-medium">
                              {item.course}
                            </p>
                          </td>

                          {/* Semester */}
                          <td className="py-4 px-6 text-center">
                            <p className="text-white font-medium">
                              {item.semester}
                            </p>
                          </td>

                          {/* Attendance */}
                          <td className="py-4 px-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span
                                className={`font-bold ${getAttendanceColor(
                                  item.percentage
                                )}`}
                              >
                                {item.percentage}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border ${getStatusColor(
                                item.status
                              )} shadow-sm`}
                            >
                              {getStatusIcon(item.status)}
                              {item.status}
                            </span>
                          </td>

                          {/* Date */}
                          <td className="py-4 px-6">
                            <p className="text-white font-medium">
                              {formatDate(item.date)}
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Responsive Cards for smaller screens */}
              <div className="md:hidden">
                <div className="p-4 space-y-4">
                  {[...filteredAttendanceData]
                    .sort((a, b) => a.roll.localeCompare(b.roll))
                    .map((item, index) => (
                      <div
                        key={`mobile-${item.studentId}-${item.courseId}-${item.date}`}
                        className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-lg p-4 space-y-3 animate-fadeInUp"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 backdrop-blur-sm rounded-lg border border-blue-400/40 flex items-center justify-center">
                              <span className="text-blue-200 font-bold text-xs">
                                {item.roll}
                              </span>
                            </div>
                            <div>
                              <p className="text-white font-semibold text-sm">
                                {item.name}
                              </p>
                              <p className="text-white/70 text-xs">
                                {item.course}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {getStatusIcon(item.status)}
                            {item.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-white/70">
                              Sem: {item.semester}
                            </span>
                            <div className="flex items-center gap-1">
                              <TrendingUp
                                className={`w-3 h-3 ${getAttendanceColor(
                                  item.percentage
                                )}`}
                              />
                              <span
                                className={`font-bold ${getAttendanceColor(
                                  item.percentage
                                )}`}
                              >
                                {item.percentage}%
                              </span>
                            </div>
                          </div>
                          <span className="text-white/70 text-xs">
                            {formatDate(item.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceResultComponent;
