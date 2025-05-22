import { getCurrentUser } from "@/auth/nextjs/currentUser";
import FacultyDashBoardComponent from "@/components/faculty/FacultyDashBoardComponent";

export default async function FacultyDashBoard() {
  // Server-side user fetching and validation
  const user = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return <FacultyDashBoardComponent user={user} />;
}
