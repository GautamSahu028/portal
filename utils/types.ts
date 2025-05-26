export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    }
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export interface FacultyCourse {
  id: string;
  code: string;
  name: string;
  description: string | null;
  createdAt: Date;
  enrolledStudentsCount: number;
  enrolledStudents: EnrolledStudent[]; // Added this field
  faculty: {
    id: string;
    employeeId: string;
    department: string;
    designation: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export interface EnrolledStudent {
  id: string;
  rollNumber: string;
  enrollmentNumber: string;
  department: string;
  currentSemester: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AttendanceRecord {
  roll_no: string;
  name: string;
  course: string;
  date: string;
  status: "PRESENT" | "ABSENT";
  time_of_record: string;
  similarity?: string;
}

export type AttendanceOutput = {
  studentId: string;
  courseId: string;
  date: Date;
  status: "PRESENT" | "ABSENT";
};
