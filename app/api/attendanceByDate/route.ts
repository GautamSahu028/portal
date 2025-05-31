// File: /app/api/attendanceByDate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAttendanceByDate } from "@/utils/actions";
import { AttendanceByDateItem } from "@/utils/types";

// We’ll respond with JSON shapes like:
//   { success: true, data: AttendanceByDateItem[] }
//   { success: false, error: string }

export async function GET(request: NextRequest) {
  try {
    // 1️⃣ Extract the “date” query parameter from the URL.
    //    Expect format: ?date=YYYY-MM-DD
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json(
        { success: false, error: "Missing `date` query parameter." },
        { status: 400 }
      );
    }

    // 2️⃣ Call the same action you wrote in utils/actions.ts
    const result = await getAttendanceByDate(dateParam);

    if (!result.success) {
      // The action returned { success: false, error: "..." }
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // 3️⃣ If everything is okay, return { success: true, data: [...] }
    //    The frontend can then fetch("/api/attendanceByDate?date=2025-05-30") and read .data
    return NextResponse.json(
      { success: true, data: result.data as AttendanceByDateItem[] },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in /api/attendanceByDate/route.ts:", err);
    return NextResponse.json(
      { success: false, error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
