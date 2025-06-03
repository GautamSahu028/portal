import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { courseId, date } = await req.json();

    if (!courseId || !date) {
      return NextResponse.json(
        { success: false, error: "Missing courseId or date" },
        { status: 400 }
      );
    }

    // 🔒 Normalize to UTC date range: [start, nextDay)
    const start = new Date(`${date}T00:00:00Z`); // e.g. 2025-05-30T00:00:00.000Z
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1); // 2025-05-31T00:00:00.000Z

    // 🎯 Find records on that exact UTC date
    const records = await db.attendance.findMany({
      where: {
        courseId,
        date: {
          gte: start,
          lt: end,
        },
      },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        course: {
          include: {
            subject: true,
          },
        },
      },
      orderBy: {
        student: {
          rollNumber: "asc",
        },
      },
    });

    // 🧠 Calculate dynamic percentage
    const response = await Promise.all(
      records.map(async (rec) => {
        const total = await db.attendance.count({
          where: {
            courseId,
            studentId: rec.studentId,
            date: {
              lte: start,
            },
          },
        });

        const present = await db.attendance.count({
          where: {
            courseId,
            studentId: rec.studentId,
            status: "PRESENT",
            date: {
              lte: start,
            },
          },
        });

        const percentage =
          total > 0 ? ((present / total) * 100).toFixed(2) + "%" : "0.00%";

        return {
          studentId: rec.studentId,
          courseId: rec.courseId,
          roll: rec.student.rollNumber,
          name: rec.student.user.name,
          course: rec.course.subject.name,
          semester: rec.student.currentSemester,
          percentage,
          status: rec.status,
          date: rec.date.toISOString().split("T")[0], // e.g. "2025-05-30"
        };
      })
    );

    return NextResponse.json({ success: true, data: response });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
