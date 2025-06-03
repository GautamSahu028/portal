import { getFacultyProfile } from "@/utils/actions";
import AttendanceResultComponent from "@/components/faculty/student-management/AttendanceResultComponent";

export default async function AttendanceManagementPage() {
  const facultyProfile = await getFacultyProfile();

  if (!facultyProfile.success) {
    return (
      <div className="p-10 text-red-400">
        Error loading Faculty Profile: {facultyProfile.error}
      </div>
    );
  }
  return <AttendanceResultComponent faculty={facultyProfile?.data} />;
}
