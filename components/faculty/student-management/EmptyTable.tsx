"use client";

import { Ban, Loader2 } from "lucide-react";

interface EmptyTableProps {
  message?: string;
  colSpan?: number;
  loading?: boolean;
}

const EmptyTable: React.FC<EmptyTableProps> = ({
  message = "No attendance data to show.",
  colSpan = 7,
  loading = false,
}) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground mb-2" />
          ) : (
            <Ban className="w-8 h-8 mb-2 text-muted-foreground" />
          )}
          {!loading && <p className="text-sm">{message}</p>}
        </div>
      </td>
    </tr>
  );
};

export default EmptyTable;
