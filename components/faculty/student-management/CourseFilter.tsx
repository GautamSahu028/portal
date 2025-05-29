"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
}

export function CourseFilter({ courses, selectedCourse }: CourseFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCourseChange = (courseId: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("course", courseId);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : "";

    router.push(`${window.location.pathname}${newUrl}`);
  };

  return (
    <Select value={selectedCourse} onValueChange={handleCourseChange}>
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
