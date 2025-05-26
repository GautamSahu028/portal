import { getCurrentUser } from "@/auth/nextjs/currentUser";
import AttendanceComponent from "@/components/Attendance/AttendanceComponent";
import { getFacultyCoursesByUserId } from "@/utils/actions";
const AttendancePage = async () => {
  const user = await getCurrentUser();
  const courses = await getFacultyCoursesByUserId(user?.id as string);
  return <AttendanceComponent courses={courses} />;
};

export default AttendancePage;
