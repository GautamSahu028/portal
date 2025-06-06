"use client";

import { Users } from "lucide-react";

interface EmptyTableProps {
  message?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const EmptyTable: React.FC<EmptyTableProps> = ({
  message = "Select a subject and date to view attendance records",
  loading = false,
  icon,
  title = "No Records Found",
  subtitle,
}) => {
  const defaultIcon = loading ? (
    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  ) : (
    <Users className="w-10 h-10 text-white/40" />
  );

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
        {icon || defaultIcon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {loading ? "Loading..." : title}
      </h3>
      <p className="text-white/60 mb-6">
        {loading ? "Loading attendance data..." : subtitle || message}
      </p>
      {loading && (
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default EmptyTable;
