"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CourseFilter } from "@/components/faculty/student-management/CourseFilter";
import { useState } from "react";
import { DatePicker } from "./DatePicker";

export default function FilterControls({
  selectedCourseId,
  allCourses,
  selectedDate,
}: {
  selectedCourseId: string;
  allCourses: any[];
  selectedDate?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateChange = (newDate: Date) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("course", selectedCourseId);

    // Normalize to local date in yyyy-mm-dd format
    const localDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate()
    );

    const formatted = localDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    params.set("date", formatted);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center px-6 py-4">
      <CourseFilter courses={allCourses} selectedCourse={selectedCourseId} />
      <DatePicker date={date} onChange={handleDateChange} />
    </div>
  );
}
