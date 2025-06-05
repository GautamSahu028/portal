import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { facultyId, subjectId } = await req.json();

    // Check if course already exists for this faculty and subject
    const existingCourse = await db.course.findFirst({
      where: {
        facultyId,
        subjectId,
      },
    });

    if (existingCourse) {
      return new NextResponse(
        "Course already exists for this faculty and subject.",
        {
          status: 400,
        }
      );
    }

    // Create new course
    const course = await db.course.create({
      data: {
        facultyId,
        subjectId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[CREATE_COURSE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
