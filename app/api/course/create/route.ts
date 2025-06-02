import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { facultyId, subjectId } = await req.json();

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
