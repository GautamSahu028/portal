import db from "@/utils/db";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import {
  AttendanceByDateItem,
  AttendanceOutput,
  FacultyCourse,
  FacultyProfile,
} from "./types";

export async function getStudentsByFaculty() {
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

    // Step 1: Get all subject IDs that have courses taught by this faculty
    const taughtCourses = await db.course.findMany({
      where: {
        facultyId: faculty.id,
      },
      select: {
        subjectId: true,
      },
    });

    const taughtSubjectIds = Array.from(
      new Set(taughtCourses.map((c) => c.subjectId))
    );

    // Step 2: Get all students enrolled in those subjects
    const studentSubjects = await db.studentSubject.findMany({
      where: {
        subjectId: { in: taughtSubjectIds },
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
              },
            },
            subjectLinks: {
              include: {
                subject: {
                  include: {
                    courses: {
                      where: {
                        facultyId: faculty.id,
                      },
                      include: {
                        subject: {
                          select: {
                            code: true,
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
        },
      },
    });

    // Step 3: Format into the expected response shape
    const seen = new Set();
    const formattedStudents = [];

    for (const ss of studentSubjects) {
      const student = ss.student;

      if (seen.has(student.id)) continue;
      seen.add(student.id);

      const allCourses = student.subjectLinks.flatMap((link) =>
        link.subject.courses.map((course) => ({
          id: course.id,
          subjectCode: course.subject.code,
          subjectName: course.subject.name,
        }))
      );

      formattedStudents.push({
        id: student.id,
        rollNumber: student.rollNumber,
        enrollmentNumber: student.enrollmentNumber,
        department: student.department,
        currentSemester: student.currentSemester,
        user: student.user,
        courses: allCourses,
      });
    }

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

    // Validate course belongs to this faculty and fetch its subject
    const course = await db.course.findFirst({
      where: {
        id: courseId,
        facultyId: faculty.id,
      },
      include: {
        subject: true,
      },
    });

    if (!course) {
      throw new Error(
        "Course not found or you do not have permission to view this course"
      );
    }

    // Get students who are enrolled in the subject of this course
    const studentSubjects = await db.studentSubject.findMany({
      where: {
        subjectId: course.subjectId,
      },
      include: {
        student: {
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
        },
      },
    });

    const formattedStudents = studentSubjects.map(({ student }) => ({
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
        code: course.subject.code,
        name: course.subject.name,
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
        subject: {
          include: {
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
        },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses.map((course) => ({
      id: course.id,
      code: course.subject.code,
      name: course.subject.name,
      description: null, // no longer in schema
      createdAt: course.createdAt,
      enrolledStudentsCount: course.subject._count.enrollments,
      enrolledStudents: course.subject.enrollments.map((enrollment) => ({
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

export const getAttendanceByCourseId = async (
  courseId: string
): Promise<
  | { success: true; data: AttendanceByDateItem[] }
  | { success: false; error: string }
> => {
  try {
    const attendanceRecords = await db.attendance.findMany({
      where: { courseId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        course: {
          include: {
            subject: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        student: {
          rollNumber: "asc",
        },
      },
    });

    const perStudentTotals = new Map<
      string,
      { seen: number; present: number }
    >();

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

      const pctSoFar =
        totals.seen > 0
          ? ((totals.present / totals.seen) * 100).toFixed(2)
          : "0.00";

      return {
        studentId: r.studentId,
        courseId: r.courseId,
        roll: r.student.rollNumber,
        name: r.student.user.name,
        course: r.course.subject.name,
        semester: r.student.currentSemester,
        percentage: pctSoFar,
        status: r.status as "PRESENT" | "ABSENT",
        date: r.date.toISOString(),
      };
    });

    return { success: true, data: itemsAsc };
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
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    if (currentUser.role !== "FACULTY") {
      throw new Error(
        "Access denied. Only faculty members can view attendance."
      );
    }

    const dayStart = new Date(dateString);
    dayStart.setUTCHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);
    dayEnd.setUTCHours(0, 0, 0, 0);

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
          include: {
            subject: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: {
        course: {
          subject: {
            name: "asc",
          },
        },
        student: {
          rollNumber: "asc",
        },
      },
    });

    const formatted: AttendanceByDateItem[] = [];

    for (const rec of todayRecords) {
      const sid = rec.studentId;
      const cid = rec.courseId;

      const totalCount = await db.attendance.count({
        where: {
          studentId: sid,
          courseId: cid,
          date: { lte: dayEnd },
        },
      });

      const presentCount = await db.attendance.count({
        where: {
          studentId: sid,
          courseId: cid,
          date: { lte: dayEnd },
          status: "PRESENT",
        },
      });

      const percentage =
        totalCount > 0
          ? ((presentCount / totalCount) * 100).toFixed(2) + "%"
          : "0.00%";

      formatted.push({
        studentId: rec.studentId,
        courseId: rec.courseId,
        roll: rec.student.rollNumber,
        name: rec.student.user.name,
        course: rec.course.subject.name, // updated to get name from subject
        semester: rec.student.currentSemester,
        percentage,
        status: rec.status,
        date: rec.date.toISOString(),
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

export async function getFacultyProfile(): Promise<
  { success: true; data: FacultyProfile } | { success: false; error: string }
> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== "FACULTY") {
      throw new Error("Unauthorized or invalid role");
    }

    const faculty = await db.faculty.findUnique({
      where: { userId: currentUser.id },
      include: {
        user: true,
        courses: {
          include: {
            subject: {
              select: {
                code: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!faculty) throw new Error("Faculty not found");

    const profile: FacultyProfile = {
      id: faculty.id,
      name: faculty.user.name,
      email: faculty.user.email,
      department: faculty.department,
      designation: faculty.designation,
      courses: faculty.courses.map((course) => ({
        id: course.id,
        createdAt: course.createdAt,
        subjectCode: course.subject.code,
        subjectName: course.subject.name,
      })),
    };

    return { success: true, data: profile };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
