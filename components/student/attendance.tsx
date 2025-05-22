"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Check, X, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface AttendanceRecord {
  id: string;
  course: string;
  date: string;
  status: "present" | "absent" | "late";
}

// Mock data
const attendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    course: "CS101: Intro to Programming",
    date: "2025-05-10",
    status: "present",
  },
  {
    id: "2",
    course: "CS201: Data Structures",
    date: "2025-05-10",
    status: "present",
  },
  {
    id: "3",
    course: "CS301: Algorithms",
    date: "2025-05-09",
    status: "late",
  },
  {
    id: "4",
    course: "CS101: Intro to Programming",
    date: "2025-05-08",
    status: "present",
  },
  {
    id: "5",
    course: "CS201: Data Structures",
    date: "2025-05-08",
    status: "absent",
  },
  {
    id: "6",
    course: "CS301: Algorithms",
    date: "2025-05-07",
    status: "present",
  },
  {
    id: "7",
    course: "CS101: Intro to Programming",
    date: "2025-05-06",
    status: "present",
  },
  {
    id: "8",
    course: "CS201: Data Structures",
    date: "2025-05-06",
    status: "present",
  },
  {
    id: "9",
    course: "CS301: Algorithms",
    date: "2025-05-05",
    status: "present",
  },
  {
    id: "10",
    course: "CS101: Intro to Programming",
    date: "2025-05-04",
    status: "present",
  },
];

// Course summary data
const courseSummary = [
  { course: "CS101", present: 92, absent: 5, late: 3 },
  { course: "CS201", present: 85, absent: 10, late: 5 },
  { course: "CS301", present: 88, absent: 7, late: 5 },
];

export default function StudentAttendance() {
  const [filter, setFilter] = useState("all");

  // Filter records based on selected course
  const filteredRecords = attendanceRecords.filter((record) => {
    if (filter === "all") return true;
    return record.course.startsWith(filter);
  });

  // Calculate overall attendance percentages
  const totalClasses = attendanceRecords.length;
  const present = attendanceRecords.filter(
    (r) => r.status === "present"
  ).length;
  const absent = attendanceRecords.filter((r) => r.status === "absent").length;
  const late = attendanceRecords.filter((r) => r.status === "late").length;

  const pieData = [
    { name: "Present", value: (present / totalClasses) * 100 },
    { name: "Absent", value: (absent / totalClasses) * 100 },
    { name: "Late", value: (late / totalClasses) * 100 },
  ];

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
  ];

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <Check className="h-5 w-5 text-emerald-500" />;
      case "absent":
        return <X className="h-5 w-5 text-rose-500" />;
      case "late":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="CS101">CS101: Intro to Programming</SelectItem>
            <SelectItem value="CS201">CS201: Data Structures</SelectItem>
            <SelectItem value="CS301">CS301: Algorithms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="records">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(record.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="capitalize">{record.status}</span>
                      {renderStatusIcon(record.status)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-500">
                  {Math.round((present / totalClasses) * 100)}%
                </div>
                <CardDescription>
                  {present} out of {totalClasses} classes
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-rose-500">
                  {Math.round((absent / totalClasses) * 100)}%
                </div>
                <CardDescription>
                  {absent} out of {totalClasses} classes
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Late</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-500">
                  {Math.round((late / totalClasses) * 100)}%
                </div>
                <CardDescription>
                  {late} out of {totalClasses} classes
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) =>
                          typeof value === "number"
                            ? `${value.toFixed(1)}%`
                            : `${value}%`
                        }
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courseSummary.map((course) => (
                    <div key={course.course} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{course.course}</div>
                        <div className="text-sm font-medium">
                          {course.present}% Present
                        </div>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${course.present}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
