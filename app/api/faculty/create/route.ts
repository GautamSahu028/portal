import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, employeeId, department, designation, subjectId } = body;

    // 1. Create faculty
    const faculty = await db.faculty.create({
      data: {
        userId,
        department,
        designation,
      },
    });

    // 2. Create course for selected subject
    await db.course.create({
      data: {
        facultyId: faculty.id,
        subjectId: subjectId,
      },
    });

    return NextResponse.json({ success: true, facultyId: faculty.id });
  } catch (error) {
    console.error("[FACULTY_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
