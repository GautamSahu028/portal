import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subjects = await db.subject.findMany({
      select: { id: true, code: true, name: true },
    });
    return NextResponse.json(subjects);
  } catch (error) {
    console.error("[GET_SUBJECTS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
