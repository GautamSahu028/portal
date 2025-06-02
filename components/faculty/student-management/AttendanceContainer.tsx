"use client";

import { useEffect, useState } from "react";
import { getAttendanceByCourseId } from "@/utils/actions";
import EditableAttendanceTable from "./EditableAttendanceTable";
import FilterControls from "./FilterControls";
import { format } from "date-fns";

export default function AttendanceContainer({
  initialCourseId,
  allCourses,
}: {
  initialCourseId: string;
  allCourses: { id: string; name: string; code: string }[];
}) {
  const [courseId, setCourseId] = useState(initialCourseId);
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [fullData, setFullData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Fetch attendance for courseId
  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await fetch(`/api/attendance/${courseId}`);
      const json = await res.json();
      setFullData(json.success ? json.data : []);
    };
    fetchAttendance();
  }, [courseId]);

  // Filter on date change or fullData change
  useEffect(() => {
    const filtered = fullData.filter((entry) => {
      const entryDate = new Date(entry.date).toLocaleDateString("en-CA");
      return entryDate === date;
    });
    setFilteredData(filtered);
  }, [date, fullData]);

  return (
    <>
      <FilterControls
        allCourses={allCourses}
        initialCourseId={courseId}
        initialDate={date}
        onApply={(cid, selectedDate) => {
          setCourseId(cid);
          setDate(selectedDate);
        }}
      />

      <EditableAttendanceTable data={filteredData} />
    </>
  );
}
