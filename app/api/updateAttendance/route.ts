import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { studentId, courseId, date, status } = await req.json();

    console.log({ studentId, courseId, date, status });

    if (!studentId || !courseId || !date || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updated = await db.attendance.update({
      where: {
        studentId_courseId_date: {
          studentId,
          courseId,
          date: new Date(date),
        },
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update attendance" },
      { status: 500 }
    );
  }
}
