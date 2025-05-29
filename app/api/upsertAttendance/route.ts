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

    const results = await Promise.all(
      body.map(async (record) => {
        const { studentId, courseId, date, status } = record;

        if (!studentId || !courseId || !date || !status) {
          return { error: "Missing required fields in record", record };
        }

        return await db.attendance.upsert({
          where: {
            studentId_courseId_date: {
              studentId,
              courseId,
              date: new Date(date),
            },
          },
          update: {
            status,
          },
          create: {
            studentId,
            courseId,
            date: new Date(date),
            status,
          },
        });
      })
    );

    const errors = results.filter((r: any) => r?.error);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: "Some records failed", details: errors },
        { status: 207 }
      );
    }

    return NextResponse.json({ success: true, message: "Attendance upserted" });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
