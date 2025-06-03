import db from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid data format: expected an array." },
        { status: 400 }
      );
    }

    const validData = body
      .filter(
        (record) =>
          record.studentId && record.courseId && record.date && record.status
      )
      .map((record) => {
        const date = new Date(record.date);
        date.setUTCHours(0, 0, 0, 0); // 🌐 normalize to UTC midnight

        return {
          studentId: record.studentId,
          courseId: record.courseId,
          date,
          status: record.status,
        };
      });

    if (validData.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid records to insert." },
        { status: 400 }
      );
    }

    await db.attendance.createMany({
      data: validData,
      skipDuplicates: true, // Prevents unique constraint violations
    });

    return NextResponse.json({
      success: true,
      message: "Attendance created successfully.",
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
