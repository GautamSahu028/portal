// app/api/upsertAttendance/route.ts (App Router - Next.js 13+)
import db from "@/utils/db";
import { AttendanceOutput } from "@/utils/types";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const finalAttendance: AttendanceOutput[] = await req.json();

    for (const record of finalAttendance) {
      const existing = await db.attendance.findUnique({
        where: {
          studentId_courseId_date: {
            studentId: record.studentId,
            courseId: record.courseId,
            date: new Date(record.date),
          },
        },
      });

      if (existing) {
        await db.attendance.update({
          where: {
            studentId_courseId_date: {
              studentId: record.studentId,
              courseId: record.courseId,
              date: new Date(record.date),
            },
          },
          data: {
            status: record.status,
            totalClassesTillDate: { increment: 1 },
            totalPresentTillDate:
              record.status === "PRESENT" ? { increment: 1 } : undefined,
          },
        });
      } else {
        await db.attendance.create({
          data: {
            studentId: record.studentId,
            courseId: record.courseId,
            date: new Date(record.date),
            status: record.status,
            totalClassesTillDate: 1,
            totalPresentTillDate: record.status === "PRESENT" ? 1 : 0,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error inserting attendance:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
