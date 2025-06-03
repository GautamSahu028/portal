import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const courseId = (await params).courseId;

  const data = await db.attendance.findMany({
    where: { courseId },
    include: {
      student: {
        include: { user: true },
      },
      course: {
        include: { subject: { select: { name: true } } },
      },
    },
    orderBy: { date: "asc" },
  });

  return NextResponse.json({ success: true, data });
}
