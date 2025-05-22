"use client";

import { useState } from "react";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
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

interface AttendanceData {
  name: string;
  present: number;
  absent: number;
  late: number;
}

const mockData: AttendanceData[] = [
  { name: "CS101", present: 85, absent: 10, late: 5 },
  { name: "CS201", present: 78, absent: 15, late: 7 },
  { name: "CS301", present: 90, absent: 7, late: 3 },
  { name: "CS401", present: 82, absent: 13, late: 5 },
  { name: "CS501", present: 88, absent: 8, late: 4 },
];

const mockDetailedData: AttendanceData[] = [
  { name: "Week 1", present: 95, absent: 3, late: 2 },
  { name: "Week 2", present: 90, absent: 7, late: 3 },
  { name: "Week 3", present: 85, absent: 10, late: 5 },
  { name: "Week 4", present: 82, absent: 13, late: 5 },
  { name: "Week 5", present: 88, absent: 8, late: 4 },
  { name: "Week 6", present: 92, absent: 5, late: 3 },
  { name: "Week 7", present: 87, absent: 10, late: 3 },
  { name: "Week 8", present: 84, absent: 12, late: 4 },
];

interface AttendanceChartProps {
  extended?: boolean;
}

export default function AttendanceChart({ extended = false }: AttendanceChartProps) {
  const [period, setPeriod] = useState("semester");
  const [course, setCourse] = useState("all");

  const data = extended ? mockDetailedData : mockData;
  
  return (
    <div className="space-y-4">
      {extended && (
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label className="text-sm font-medium mb-1 block">Time Period</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-sm font-medium mb-1 block">Course</label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="cs101">CS101: Intro to Programming</SelectItem>
                <SelectItem value="cs201">CS201: Data Structures</SelectItem>
                <SelectItem value="cs301">CS301: Algorithms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      <div className={extended ? "h-96" : "h-72"}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
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
              angle={-45} 
              textAnchor="end" 
              height={60} 
              interval={0}
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Bar 
              dataKey="present" 
              name="Present" 
              fill="hsl(var(--chart-1))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="absent" 
              name="Absent" 
              fill="hsl(var(--chart-2))" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="late" 
              name="Late" 
              fill="hsl(var(--chart-3))" 
              radius={[4, 4, 0, 0]} 
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}