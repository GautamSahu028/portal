import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { StudentDashboardComponent } from "@/components/student/StudentDashBoardComponent";

export default async function StudentDashboard() {
  // Server-side user fetching and validation
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return <StudentDashboardComponent user={user} />;
}
