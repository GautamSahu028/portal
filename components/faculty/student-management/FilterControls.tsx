"use client";

import { useState } from "react";
import { format } from "date-fns";
import { DatePicker } from "./DatePicker";
import { CourseFilter } from "./CourseFilter";

export default function FilterControls({
  initialCourseId,
  initialDate,
  allCourses,
  onApply,
}: {
  initialCourseId: string;
  initialDate?: string;
  allCourses: { id: string; code: string; name: string }[];
  onApply: (courseId: string, date: string) => void;
}) {
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );

  const handleApply = () => {
    const dateToUse = selectedDate
      ? format(selectedDate, "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    onApply(selectedCourseId, dateToUse);
  };

  return (
    <div className="flex gap-4 items-end flex-wrap px-6 py-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          Course
        </label>
        <CourseFilter
          courses={allCourses}
          selectedCourse={selectedCourseId}
          onChange={setSelectedCourseId}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          Date
        </label>
        <DatePicker date={selectedDate} onChange={setSelectedDate} />
      </div>
      <button
        onClick={handleApply}
        className="h-10 px-4 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
      >
        Apply
      </button>
    </div>
  );
}
