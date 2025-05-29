// components/ui/EmptyTable.tsx

import { CalendarX2 } from "lucide-react";

export default function EmptyTable({ message }: { message: string }) {
  return (
    <div className="text-center text-slate-400 py-12 flex flex-col items-center justify-center">
      <CalendarX2 className="h-12 w-12 mb-3 text-slate-600" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
