import { logOut } from "@/auth/nextjs/actions";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await logOut();
}
