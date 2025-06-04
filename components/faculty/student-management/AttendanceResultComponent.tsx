"use client";
import { useEffect, useState } from "react";
import { AttendanceByDateItem, FacultyProfile } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
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
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(""); // start unselected
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
    setSubjects(allSubjects); // ✅ don't auto-select any subject
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

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-10">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="w-5 h-5 text-green-500 dark:text-green-400" />
            Attendance Records for {selectedDate}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 w-full">
            {/* Subject Dropdown + Get Attendance Button */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select
                value={selectedSubjectId}
                onValueChange={setSelectedSubjectId}
              >
                <SelectTrigger className="w-full sm:w-[250px]">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={handleLogSubject}
                disabled={!selectedSubjectId}
              >
                Get Attendance
              </Button>
            </div>

            {/* Date Picker */}
            <input
              type="date"
              className="bg-background border border-border rounded-md px-3 py-2 text-foreground w-full sm:w-auto"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="text-center">Attendance %</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendanceData.length === 0 ? (
                  <EmptyTable
                    loading={loading}
                    message="No attendance data to show."
                    colSpan={7}
                  />
                ) : (
                  [...filteredAttendanceData]
                    .sort((a, b) => a.roll.localeCompare(b.roll))
                    .map((item) => (
                      <TableRow
                        key={`${item.studentId}-${item.courseId}-${item.date}`}
                      >
                        <TableCell>{item.roll}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.course}</TableCell>
                        <TableCell>{item.semester}</TableCell>
                        <TableCell
                          className={`text-center font-semibold ${
                            parseFloat(item.percentage) >= 80
                              ? "text-green-500"
                              : parseFloat(item.percentage) >= 70
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.percentage}
                        </TableCell>
                        <TableCell
                          className={`text-center font-semibold ${
                            item.status === "PRESENT"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceResultComponent;
