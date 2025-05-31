"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CourseFilter } from "@/components/faculty/student-management/CourseFilter";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";

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
    // 1️⃣ Update local state if needed:
    setDate(newDate);

    // 2️⃣ Copy over existing search params
    const params = new URLSearchParams(searchParams.toString());
    params.set("course", selectedCourseId);

    // 3️⃣ Format the newDate in local timezone as 'yyyy-MM-dd'
    //    This will **not** shift backwards by UTC offset
    const formatted = format(newDate, "yyyy-MM-dd");
    params.set("date", formatted);

    // 4️⃣ Push new URL
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-4 items-center px-6 py-4">
      <CourseFilter courses={allCourses} selectedCourse={selectedCourseId} />
      <DatePicker date={date} onChange={handleDateChange} />
    </div>
  );
}
