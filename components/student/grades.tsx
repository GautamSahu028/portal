"use client";

import { useState } from "react";
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Grade {
  id: string;
  course: string;
  type: string;
  name: string;
  score: number;
  totalScore: number;
  date: string;
}

interface CourseSummary {
  id: string;
  course: string;
  assignments: number;
  midterm: number;
  final: number;
  overall: number;
  letterGrade: string;
}

// Mock data
const grades: Grade[] = [
  {
    id: "1",
    course: "CS101: Intro to Programming",
    type: "Assignment",
    name: "Assignment 1",
    score: 9,
    totalScore: 10,
    date: "2025-02-15",
  },
  {
    id: "2",
    course: "CS101: Intro to Programming",
    type: "Assignment",
    name: "Assignment 2",
    score: 8,
    totalScore: 10,
    date: "2025-03-10",
  },
  {
    id: "3",
    course: "CS101: Intro to Programming",
    type: "Midterm",
    name: "Midterm Exam",
    score: 85,
    totalScore: 100,
    date: "2025-03-25",
  },
  {
    id: "4",
    course: "CS201: Data Structures",
    type: "Assignment",
    name: "Assignment 1",
    score: 18,
    totalScore: 20,
    date: "2025-02-20",
  },
  {
    id: "5",
    course: "CS201: Data Structures",
    type: "Assignment",
    name: "Assignment 2",
    score: 17,
    totalScore: 20,
    date: "2025-03-15",
  },
  {
    id: "6",
    course: "CS201: Data Structures",
    type: "Midterm",
    name: "Midterm Exam",
    score: 78,
    totalScore: 100,
    date: "2025-03-30",
  },
  {
    id: "7",
    course: "CS301: Algorithms",
    type: "Assignment",
    name: "Assignment 1",
    score: 28,
    totalScore: 30,
    date: "2025-02-25",
  },
  {
    id: "8",
    course: "CS301: Algorithms",
    type: "Quiz",
    name: "Quiz 1",
    score: 18,
    totalScore: 20,
    date: "2025-03-20",
  },
  {
    id: "9",
    course: "CS301: Algorithms",
    type: "Midterm",
    name: "Midterm Exam",
    score: 92,
    totalScore: 100,
    date: "2025-04-05",
  },
];

// Course summary data
const courseSummary: CourseSummary[] = [
  {
    id: "1",
    course: "CS101: Intro to Programming",
    assignments: 85,
    midterm: 85,
    final: 88,
    overall: 86,
    letterGrade: "B+",
  },
  {
    id: "2",
    course: "CS201: Data Structures",
    assignments: 88,
    midterm: 78,
    final: 83,
    overall: 83,
    letterGrade: "B",
  },
  {
    id: "3",
    course: "CS301: Algorithms",
    assignments: 93,
    midterm: 92,
    final: 90,
    overall: 92,
    letterGrade: "A-",
  },
];

interface StudentGradesProps {
  summary?: boolean;
}

export default function StudentGrades({ summary = false }: StudentGradesProps) {
  const [filter, setFilter] = useState("all");
  
  // Filter grades based on selected course
  const filteredGrades = grades.filter((grade) => {
    if (filter === "all") return true;
    return grade.course.startsWith(filter);
  });
  
  // Prepare chart data
  const chartData = courseSummary.map((course) => ({
    name: course.course.split(":")[0],
    Assignments: course.assignments,
    Midterm: course.midterm,
    Final: course.final,
    Overall: course.overall,
  }));
  
  if (summary) {
    return (
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={0} 
              textAnchor="middle" 
              height={60} 
            />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar 
              dataKey="Overall" 
              name="Overall" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]} 
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
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
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 50,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={0} 
                    textAnchor="middle" 
                    height={60} 
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar 
                    dataKey="Assignments" 
                    name="Assignments" 
                    fill="hsl(var(--chart-1))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="Midterm" 
                    name="Midterm" 
                    fill="hsl(var(--chart-2))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="Final" 
                    name="Final" 
                    fill="hsl(var(--chart-3))" 
                    radius={[4, 4, 0, 0]} 
                  />
                  <Bar 
                    dataKey="Overall" 
                    name="Overall" 
                    fill="hsl(var(--chart-4))" 
                    radius={[4, 4, 0, 0]} 
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Course Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-right">Assignments</TableHead>
                  <TableHead className="text-right">Midterm</TableHead>
                  <TableHead className="text-right">Final</TableHead>
                  <TableHead className="text-right">Overall</TableHead>
                  <TableHead className="text-right">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseSummary
                  .filter((course) => {
                    if (filter === "all") return true;
                    return course.course.startsWith(filter);
                  })
                  .map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell className="text-right">{course.assignments}%</TableCell>
                      <TableCell className="text-right">{course.midterm}%</TableCell>
                      <TableCell className="text-right">{course.final}%</TableCell>
                      <TableCell className="text-right">{course.overall}%</TableCell>
                      <TableCell className="text-right font-bold">{course.letterGrade}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assessment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.course.split(":")[0]}</TableCell>
                    <TableCell>{grade.name}</TableCell>
                    <TableCell>{grade.type}</TableCell>
                    <TableCell className="text-right">
                      {grade.score}/{grade.totalScore} ({Math.round((grade.score / grade.totalScore) * 100)}%)
                    </TableCell>
                    <TableCell className="text-right">
                      {new Date(grade.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}