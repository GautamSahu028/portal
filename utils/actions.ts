import db from "@/utils/db";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { AttendanceByDateItem, AttendanceOutput, FacultyCourse } from "./types";

export async function getStudentsByFaculty() {
  try {
    // Get the current logged-in user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Check if the current user is a faculty member
    if (currentUser.role !== "FACULTY") {
      throw new Error(
        "Access denied. Only faculty members can view enrolled students."
      );
    }

    // Get the faculty record for the current user
    const faculty = await db.faculty.findUnique({
      where: {
        userId: currentUser.id,
      },
    });

    if (!faculty) {
      throw new Error("Faculty record not found");
    }

    // Get all students enrolled in courses taught by this faculty
    const studentsInFacultyCourses = await db.student.findMany({
      where: {
        enrollments: {
          some: {
            course: {
              facultyId: faculty.id,
            },
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
        enrollments: {
          where: {
            course: {
              facultyId: faculty.id,
            },
          },
          include: {
            course: {
              select: {
                id: true,
                code: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: [{ rollNumber: "asc" }],
    });

    // Transform the data for easier consumption
    const formattedStudents = studentsInFacultyCourses.map((student) => ({
      id: student.id,
      rollNumber: student.rollNumber,
      enrollmentNumber: student.enrollmentNumber,
      department: student.department,
      currentSemester: student.currentSemester,
      user: student.user,
      courses: student.enrollments.map((enrollment) => enrollment.course),
    }));

    return {
      success: true,
      data: formattedStudents,
      totalStudents: formattedStudents.length,
    };
  } catch (error) {
    console.error("Error fetching students by faculty:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: [],
      totalStudents: 0,
    };
  }
}

export async function getStudentsByCourse(courseId: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    if (currentUser.role !== "FACULTY") {
      throw new Error(
        "Access denied. Only faculty members can view enrolled students."
      );
    }

    const faculty = await db.faculty.findUnique({
      where: {
        userId: currentUser.id,
      },
    });

    if (!faculty) {
      throw new Error("Faculty record not found");
    }

    // Verify that the course belongs to this faculty
    const course = await db.course.findFirst({
      where: {
        id: courseId,
        facultyId: faculty.id,
      },
    });

    if (!course) {
      throw new Error(
        "Course not found or you do not have permission to view this course"
      );
    }

    // Get students enrolled in the specific course
    const studentsInCourse = await db.student.findMany({
      where: {
        enrollments: {
          some: {
            courseId: courseId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        },
      },
      orderBy: [{ rollNumber: "asc" }],
    });

    const formattedStudents = studentsInCourse.map((student) => ({
      id: student.id,
      rollNumber: student.rollNumber,
      enrollmentNumber: student.enrollmentNumber,
      department: student.department,
      currentSemester: student.currentSemester,
      user: student.user,
    }));

    return {
      success: true,
      data: formattedStudents,
      course: {
        id: course.id,
        code: course.code,
        name: course.name,
        description: course.description,
      },
      totalStudents: formattedStudents.length,
    };
  } catch (error) {
    console.error("Error fetching students by course:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      data: [],
      totalStudents: 0,
    };
  }
}

export async function getFacultyCoursesByUserId(
  userId: string
): Promise<FacultyCourse[]> {
  try {
    const courses = await db.course.findMany({
      where: {
        faculty: {
          userId: userId,
        },
      },
      include: {
        faculty: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        enrollments: {
          include: {
            student: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
          orderBy: {
            student: {
              user: {
                name: "asc",
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses.map((course) => ({
      id: course.id,
      code: course.code,
      name: course.name,
      description: course.description,
      createdAt: course.createdAt,
      enrolledStudentsCount: course._count.enrollments,
      enrolledStudents: course.enrollments.map((enrollment) => ({
        id: enrollment.student.id,
        rollNumber: enrollment.student.rollNumber,
        enrollmentNumber: enrollment.student.enrollmentNumber,
        department: enrollment.student.department,
        currentSemester: enrollment.student.currentSemester,
        user: {
          id: enrollment.student.user.id,
          name: enrollment.student.user.name,
          email: enrollment.student.user.email,
        },
      })),
      faculty: {
        id: course.faculty.id,
        employeeId: course.faculty.employeeId,
        department: course.faculty.department,
        designation: course.faculty.designation,
        user: {
          name: course.faculty.user.name,
          email: course.faculty.user.email,
        },
      },
    }));
  } catch (error) {
    console.error("Error fetching faculty courses:", error);
    throw new Error("Failed to fetch faculty courses");
  }
}

export async function getCourse(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        faculty: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        enrollments: {
          include: {
            student: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        attendances: {
          include: {
            student: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            date: "desc",
          },
        },
        announcements: {
          orderBy: {
            postedAt: "desc",
          },
        },
        semestersGrades: {
          include: {
            semester: {
              include: {
                student: {
                  include: {
                    user: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return {
        success: false,
        error: "Course not found",
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: course,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      success: false,
      error: "Failed to fetch course",
      data: null,
    };
  }
}

export async function getCourseBasic(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        faculty: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return {
        success: false,
        error: "Course not found",
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: course,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      success: false,
      error: "Failed to fetch course",
      data: null,
    };
  }
}

export async function getCourseWithStats(courseId: string) {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        faculty: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
            attendances: true,
            announcements: true,
          },
        },
      },
    });

    if (!course) {
      return {
        success: false,
        error: "Course not found",
        data: null,
      };
    }

    return {
      success: true,
      error: null,
      data: course,
    };
  } catch (error) {
    console.error("Error fetching course:", error);
    return {
      success: false,
      error: "Failed to fetch course",
      data: null,
    };
  }
}

export const getAttendanceByCourseId = async (
  courseId: string
): Promise<
  | { success: true; data: AttendanceByDateItem[] }
  | { success: false; error: string }
> => {
  try {
    // 1) Fetch all attendance rows for this course, in ASCENDING date order:
    const attendanceRecords = await db.attendance.findMany({
      where: { courseId },
      include: {
        student: {
          include: { user: true },
        },
        course: true,
      },
      orderBy: { date: "asc" },
    });

    // 2) Prepare a Map to track, for each studentId, how many records we've seen so far
    //    and how many of those were PRESENT.
    const perStudentTotals = new Map<
      string,
      { seen: number; present: number }
    >();

    // 3) Build the AttendanceByDateItem[] in ascending‐date order, calculating "running %"
    const itemsAsc: AttendanceByDateItem[] = attendanceRecords.map((r) => {
      const sid = r.studentId;
      if (!perStudentTotals.has(sid)) {
        perStudentTotals.set(sid, { seen: 0, present: 0 });
      }

      const totals = perStudentTotals.get(sid)!;
      totals.seen += 1;
      if (r.status === "PRESENT") {
        totals.present += 1;
      }

      // Compute running percentage up to _this_ row:
      const pctSoFar =
        totals.seen > 0
          ? ((totals.present / totals.seen) * 100).toFixed(2)
          : "0.00";

      return {
        studentId: r.studentId,
        courseId: r.courseId,
        roll: r.student.rollNumber,
        name: r.student.user.name,
        course: r.course.name,
        semester: r.student.currentSemester,
        percentage: pctSoFar,
        status: r.status as "PRESENT" | "ABSENT",
        date: r.date.toISOString(),
      };
    });

    // 4) Reverse so that the most recent date is first
    const finalData = itemsAsc.reverse();

    return { success: true, data: finalData };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

export async function getAttendanceByDate(
  dateString: string
): Promise<
  | { success: true; data: AttendanceByDateItem[] }
  | { success: false; error: string }
> {
  try {
    // 1. Authentication & Role Check (optional: only FACULTY can view)
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    if (currentUser.role !== "FACULTY") {
      throw new Error(
        "Access denied. Only faculty members can view attendance."
      );
    }

    // 2. Parse the incoming date
    //    We treat dateString as "YYYY-MM-DD".
    const dayStart = new Date(dateString);
    dayStart.setUTCHours(0, 0, 0, 0);

    //    dayEnd = the very start of the *next* UTC day:
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);
    dayEnd.setUTCHours(0, 0, 0, 0);

    // 3. Fetch every Attendance record whose `date` is >= dayStart AND < dayEnd
    //    Include student → user (to get `name`) and the student’s `rollNumber` & `currentSemester`
    //    Also include course → name.
    const todayRecords = await db.attendance.findMany({
      where: {
        date: {
          gte: dayStart,
          lt: dayEnd,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            rollNumber: true,
            currentSemester: true,
            user: {
              select: { name: true },
            },
          },
        },
        course: {
          select: { id: true, name: true },
        },
      },
      orderBy: {
        // (optional) sort by course name, then student roll
        course: { name: "asc" },
        student: { rollNumber: "asc" },
      },
    });

    // 4. For each attendance record, compute the cumulative attendance percentage up to `dayEnd`:
    //    - totalCount = # of attendance rows for that studentId & courseId where date <= dayEnd
    //    - presentCount = same filter + status = PRESENT
    //
    //    We do a small loop and run two `count()` calls per record. If you have many records,
    //    you could optimize by batching or grouping first, but this is O(N) where N = number of records today.
    const formatted: AttendanceByDateItem[] = [];
    for (const rec of todayRecords) {
      const sid = rec.studentId;
      const cid = rec.courseId;
      const cutoff = dayEnd; // <= dayEnd (so includes all records on the given day)

      // 4a. Count how many attendance rows exist *up to and including* the target date:
      const totalCount = await db.attendance.count({
        where: {
          studentId: sid,
          courseId: cid,
          date: { lte: cutoff },
        },
      });

      // 4b. Count how many of those have status = PRESENT:
      const presentCount = await db.attendance.count({
        where: {
          studentId: sid,
          courseId: cid,
          date: { lte: cutoff },
          status: "PRESENT",
        },
      });

      // 4c. Compute percentage string (two decimals):
      //     If there is no historical attendance (shouldn’t happen if today’s record exists),
      //     we guard against division-by-zero.
      let percentStr = "0.00%";
      if (totalCount > 0) {
        const pct = (presentCount / totalCount) * 100;
        percentStr = pct.toFixed(2) + "%";
      }

      formatted.push({
        studentId: rec.studentId,
        courseId: rec.courseId,
        roll: rec.student.rollNumber,
        name: rec.student.user.name,
        course: rec.course.name,
        semester: rec.student.currentSemester,
        percentage: percentStr,
        status: rec.status, // "PRESENT" or "ABSENT"
        date: rec.date.toISOString(), // ISO string of the actual attendance timestamp
      });
    }

    return { success: true, data: formatted };
  } catch (error) {
    console.error("Error in getAttendanceByDate:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}

export async function getFacultyProfile() {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "FACULTY") {
    throw new Error("Unauthorized or invalid role");
  }

  const faculty = await db.faculty.findUnique({
    where: { userId: currentUser.id },
    include: {
      user: true,
      courses: true,
      announcements: {
        orderBy: { postedAt: "desc" },
        take: 5,
      },
    },
  });

  if (!faculty) throw new Error("Faculty not found");

  return {
    name: faculty.user.name,
    email: faculty.user.email,
    department: faculty.department,
    designation: faculty.designation,
    employeeId: faculty.employeeId,
    courses: faculty.courses,
    announcements: faculty.announcements,
  };
}
