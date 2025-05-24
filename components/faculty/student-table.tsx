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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  UserCog,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  semester: number;
  attendance: number;
  grade: string;
}

// Mock data
const students: Student[] = [
  {
    id: "S-001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 92,
    grade: "A",
  },
  {
    id: "S-002",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 88,
    grade: "A-",
  },
  {
    id: "S-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 75,
    grade: "B",
  },
  {
    id: "S-004",
    name: "Sophia Davis",
    email: "sophia.d@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 95,
    grade: "A+",
  },
  {
    id: "S-005",
    name: "William Martinez",
    email: "william.m@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 78,
    grade: "B+",
  },
  {
    id: "S-006",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 90,
    grade: "A",
  },
  {
    id: "S-007",
    name: "James Anderson",
    email: "james.a@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 85,
    grade: "B+",
  },
  {
    id: "S-008",
    name: "Charlotte Thomas",
    email: "charlotte.t@example.com",
    department: "Computer Science",
    semester: 3,
    attendance: 93,
    grade: "A",
  },
];

export default function StudentTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const itemsPerPage = 5;

  // Filter and search students
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "high-attendance")
      return matchesSearch && student.attendance >= 90;
    if (filter === "low-attendance")
      return matchesSearch && student.attendance < 80;

    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Select
          value={filter}
          onValueChange={(value) => {
            setFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="high-attendance">
              High Attendance (≥90%)
            </SelectItem>
            <SelectItem value="low-attendance">
              Low Attendance (&lt;80%)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="text-right">Attendance</TableHead>
              <TableHead className="text-right">Grade</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {student.department}
                    <div className="md:hidden text-xs text-muted-foreground mt-1">
                      {student.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {student.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`font-medium ${
                        student.attendance >= 90
                          ? "text-emerald-500"
                          : student.attendance < 80
                          ? "text-rose-500"
                          : ""
                      }`}
                    >
                      {student.attendance}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {student.grade}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="h-4 w-4 mr-2" />
                          Manage Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Grades Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredStudents.length)} of{" "}
          {filteredStudents.length}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
