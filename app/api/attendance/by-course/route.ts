import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json(
        { success: false, error: "Missing courseId" },
        { status: 400 }
      );
    }

    const records = await db.attendance.findMany({
      where: { courseId },
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
        date: "desc",
      },
    });

    const response = await Promise.all(
      records.map(async (rec) => {
        const total = await db.attendance.count({
          where: {
            courseId,
            studentId: rec.studentId,
            date: {
              lte: rec.date,
            },
          },
        });

        const present = await db.attendance.count({
          where: {
            courseId,
            studentId: rec.studentId,
            status: "PRESENT",
            date: {
              lte: rec.date,
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
          date: rec.date.toISOString().split("T")[0],
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
