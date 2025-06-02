"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Course {
  id: string;
  code: string;
  name: string;
}

interface CourseFilterProps {
  courses: Course[];
  selectedCourse?: string;
  onChange?: (courseId: string) => void;
}

export function CourseFilter({
  courses,
  selectedCourse,
  onChange,
}: CourseFilterProps) {
  return (
    <Select
      value={selectedCourse || ""}
      onValueChange={(value) => {
        if (onChange) onChange(value);
      }}
    >
      <SelectTrigger className="w-full sm:w-[250px]">
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        {courses.map((course) => (
          <SelectItem key={course.id} value={course.id}>
            {course.code} - {course.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
