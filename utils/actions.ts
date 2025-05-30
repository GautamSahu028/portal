import db from "@/utils/db";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { AttendanceOutput, FacultyCourse } from "./types";

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

export const getAttendanceByCourseId = async (courseId: string) => {
  try {
    const attendanceRecords = await db.attendance.findMany({
      where: { courseId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        course: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    const grouped = new Map<
      string,
      {
        studentId: string;
        courseId: string;
        roll: string;
        name: string;
        course: string;
        semester: number;
        totalPresent: number;
        totalClasses: number;
        lastStatus: string;
        lastDate: Date;
      }
    >();

    for (const record of attendanceRecords) {
      const studentId = record.studentId;

      if (!grouped.has(studentId)) {
        grouped.set(studentId, {
          studentId: record.studentId,
          courseId: record.courseId,
          roll: record.student.rollNumber,
          name: record.student.user.name,
          course: record.course.name,
          semester: record.student.currentSemester,
          totalPresent: 0,
          totalClasses: 0,
          lastStatus: record.status,
          lastDate: record.date,
        });
      }

      const entry = grouped.get(studentId)!;

      entry.totalClasses += 1;
      if (record.status === "PRESENT") {
        entry.totalPresent += 1;
      }

      if (record.date > entry.lastDate) {
        entry.lastStatus = record.status;
        entry.lastDate = record.date;
      }
    }

    const finalData = Array.from(grouped.values())
      .sort((a, b) => a.roll.localeCompare(b.roll))
      .map((student) => ({
        studentId: student.studentId,
        courseId: student.courseId,
        roll: student.roll,
        name: student.name,
        course: student.course,
        semester: student.semester,
        percentage:
          student.totalClasses > 0
            ? ((student.totalPresent / student.totalClasses) * 100).toFixed(2)
            : "0.00",
        lastStatus: student.lastStatus,
        lastDate: student.lastDate.toISOString(),
      }));

    return { success: true, data: finalData };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

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
