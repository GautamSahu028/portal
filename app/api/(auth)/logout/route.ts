import { logOut } from "@/auth/nextjs/actions";

export async function POST() {
  await logOut();
}
