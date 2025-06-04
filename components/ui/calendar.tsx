// app/components/ui/calendar.tsx
"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

export function Calendar({
  selected,
  onChange,
  className,
}: {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}) {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className={cn(
        "bg-slate-800 text-white px-3 py-2 rounded border border-slate-600 focus:outline-none",
        className
      )}
      calendarClassName="bg-white rounded-lg p-4 shadow-lg"
      dayClassName={() =>
        "text-center w-10 h-10 flex items-center justify-center text-sm hover:bg-slate-200 rounded"
      }
    />
  );
}
