import db from "@/utils/db";
import { getCurrentUser } from "@/auth/nextjs/currentUser";

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

// Alternative version that gets students for a specific course
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
