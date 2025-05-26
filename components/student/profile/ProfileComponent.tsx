import React, { useState } from "react";
import type { JSX } from "react";
import {
  ArrowLeft,
  Mail,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  User,
  GraduationCap,
  MapPin,
  Phone,
  Edit3,
  Download,
  MessageSquare,
  Save,
  X,
  Check,
} from "lucide-react";

export default function ProfileComponent({
  //@ts-ignore
  profileData,
  userType = "student", // 'student' or 'faculty'
  viewerType = "student", // who is viewing: 'student' or 'faculty'
  isOwnProfile = false, // if student is viewing their own profile
  onSave = (editedData: any) => {},
  onBack = () => {},
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  // Determine if editing is allowed
  const canEdit =
    (viewerType === "student" && isOwnProfile) ||
    (viewerType === "faculty" && userType === "faculty" && isOwnProfile);

  // Sample data structure - would come from props in real implementation
  const defaultStudentData = {
    rollNo: "2211501",
    name: "Tyrion Lannister",
    email: "tyrion.lannister@student.university.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science Engineering",
    semester: 2,
    year: "2nd Year",
    course: "CS201 - Data Structures and Algorithms",
    overallAttendance: 83,
    currentGrade: "B",
    gpa: 3.2,
    address: "123 Campus Drive, University City, UC 12345",
    enrollmentDate: "August 15, 2023",
    status: "Active",
    avatar: "TL",
    type: "student",
  };

  const defaultFacultyData = {
    facultyId: "FAC001",
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    phone: "+1 (555) 987-6543",
    department: "Computer Science Engineering",
    designation: "Associate Professor",
    experience: "8 years",
    qualification: "Ph.D. in Computer Science",
    specialization: "Machine Learning, Data Science",
    coursesHandling: ["CS201 - Data Structures", "CS301 - Machine Learning"],
    office: "Room 204, CS Block",
    officeHours: "Mon-Fri, 2:00 PM - 4:00 PM",
    address: "456 Faculty Street, University City, UC 12345",
    joiningDate: "January 10, 2020",
    status: "Active",
    avatar: "JS",
    type: "faculty",
  };

  const profile =
    profileData ||
    (userType === "student" ? defaultStudentData : defaultFacultyData);

  const attendanceData = [
    { month: "Jan", percentage: 85 },
    { month: "Feb", percentage: 88 },
    { month: "Mar", percentage: 82 },
    { month: "Apr", percentage: 90 },
    { month: "May", percentage: 83 },
  ];

  const gradeHistory = [
    {
      subject: "Data Structures",
      grade: "B+",
      credits: 4,
      semester: "Fall 2023",
    },
    {
      subject: "Programming Fundamentals",
      grade: "A-",
      credits: 3,
      semester: "Fall 2023",
    },
    { subject: "Mathematics I", grade: "B", credits: 4, semester: "Fall 2023" },
    {
      subject: "Computer Networks",
      grade: "B-",
      credits: 3,
      semester: "Spring 2024",
    },
  ];

  const recentActivities =
    userType === "student"
      ? [
          {
            type: "attendance",
            message: "Marked present for CS201 lecture",
            time: "2 hours ago",
          },
          {
            type: "assignment",
            message: "Submitted Assignment 3 - Binary Trees",
            time: "1 day ago",
          },
          {
            type: "grade",
            message: "Received grade B+ for Mid-term exam",
            time: "3 days ago",
          },
          {
            type: "attendance",
            message: "Marked absent for CS201 lab session",
            time: "5 days ago",
          },
        ]
      : [
          {
            type: "class",
            message: "Conducted CS201 lecture on Binary Trees",
            time: "2 hours ago",
          },
          {
            type: "grade",
            message: "Graded Assignment 3 for 25 students",
            time: "1 day ago",
          },
          {
            type: "meeting",
            message: "Faculty meeting attendance",
            time: "3 days ago",
          },
          {
            type: "research",
            message: "Published research paper on ML algorithms",
            time: "1 week ago",
          },
        ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profile);
  };

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profile);
    setIsEditing(false);
  };

  interface HandleInputChange {
    (field: string, value: string | number): void;
  }

  const handleInputChange: HandleInputChange = (field, value) => {
    setEditedData((prev: typeof editedData) => ({
      ...prev,
      [field]: value,
    }));
  };

  interface ActivityIconProps {
    type: string;
  }

  const getActivityIcon = (type: ActivityIconProps["type"]): JSX.Element => {
    switch (type) {
      case "attendance":
        return <Clock className="w-4 h-4" />;
      case "assignment":
        return <BookOpen className="w-4 h-4" />;
      case "grade":
        return <Award className="w-4 h-4" />;
      case "class":
        return <GraduationCap className="w-4 h-4" />;
      case "meeting":
        return <User className="w-4 h-4" />;
      case "research":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  interface AttendanceData {
    month: string;
    percentage: number;
  }

  interface GradeHistory {
    subject: string;
    grade: string;
    credits: number;
    semester: string;
  }

  interface Activity {
    type: string;
    message: string;
    time: string;
  }

  interface StudentProfile {
    rollNo: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    semester: number;
    year: string;
    course: string;
    overallAttendance: number;
    currentGrade: string;
    gpa: number;
    address: string;
    enrollmentDate: string;
    status: string;
    avatar: string;
    type: "student";
  }

  interface FacultyProfile {
    facultyId: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    experience: string;
    qualification: string;
    specialization: string;
    coursesHandling: string[];
    office: string;
    officeHours: string;
    address: string;
    joiningDate: string;
    status: string;
    avatar: string;
    type: "faculty";
  }

  type Profile = StudentProfile | FacultyProfile;

  const getAttendanceColor = (percentage: number): string => {
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 80) return "text-yellow-400";
    return "text-red-400";
  };

  interface EditableFieldProps {
    label: string;
    value: string | number;
    field: string;
    type?: string;
    disabled?: boolean;
  }

  const EditableField: React.FC<EditableFieldProps> = ({
    label,
    value,
    field,
    type = "text",
    disabled = false,
  }) => {
    if (isEditing && !disabled) {
      return (
        <div>
          <label className="text-slate-400 text-sm">{label}</label>
          <input
            type={type}
            value={editedData[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="w-full mt-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      );
    }
    return (
      <div>
        <label className="text-slate-400 text-sm">{label}</label>
        <p className="text-white font-medium">{value}</p>
      </div>
    );
  };

  const getPageTitle = () => {
    if (userType === "student") {
      return isOwnProfile ? "My Profile" : "Student Profile";
    } else {
      return isOwnProfile ? "My Profile" : "Faculty Profile";
    }
  };

  const getTabsForUserType = () => {
    const baseTabs = [
      { id: "overview", label: "Overview", icon: User },
      { id: "activity", label: "Recent Activity", icon: TrendingUp },
    ];

    if (userType === "student") {
      return [
        ...baseTabs.slice(0, 1),
        { id: "attendance", label: "Attendance", icon: Clock },
        { id: "grades", label: "Grades", icon: Award },
        ...baseTabs.slice(1),
      ];
    }

    return baseTabs;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
              <p className="text-slate-400">
                {isOwnProfile
                  ? "Manage your information"
                  : `View and manage ${userType} information`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <>
                {!isOwnProfile && viewerType === "faculty" && (
                  <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                )}
                <button className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                {canEdit && (
                  <button
                    onClick={handleEdit}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Profile Header Card */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {profile.avatar}
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
                <div className="grid grid-cols-2 gap-4 text-slate-400">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>
                      {userType === "student"
                        ? `Roll No: ${profile.rollNo}`
                        : `ID: ${profile.facultyId}`}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{profile.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {userType === "student"
                        ? `Semester ${profile.semester}`
                        : profile.designation}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              {userType === "student" && (
                <div className="flex items-center justify-end space-x-4 mb-4">
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${getAttendanceColor(
                        profile.overallAttendance
                      )}`}
                    >
                      {profile.overallAttendance}%
                    </div>
                    <div className="text-sm text-slate-400">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {profile.currentGrade}
                    </div>
                    <div className="text-sm text-slate-400">Current Grade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {profile.gpa}
                    </div>
                    <div className="text-sm text-slate-400">GPA</div>
                  </div>
                </div>
              )}
              {userType === "faculty" && (
                <div className="flex items-center justify-end space-x-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {profile.experience}
                    </div>
                    <div className="text-sm text-slate-400">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {profile.coursesHandling?.length || 0}
                    </div>
                    <div className="text-sm text-slate-400">Courses</div>
                  </div>
                </div>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-900 text-green-300">
                <Check className="w-3 h-3 mr-1" />
                {profile.status}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-700 mb-6">
          <nav className="flex space-x-8">
            {getTabsForUserType().map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-slate-400 hover:text-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Personal Information
                    </h3>
                    {isEditing && (
                      <span className="text-sm text-blue-400">
                        Editing Mode
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <EditableField
                      label="Full Name"
                      value={profile.name}
                      field="name"
                    />
                    <EditableField
                      label={
                        userType === "student" ? "Roll Number" : "Faculty ID"
                      }
                      value={
                        userType === "student"
                          ? profile.rollNo
                          : profile.facultyId
                      }
                      field={userType === "student" ? "rollNo" : "facultyId"}
                      disabled={true}
                    />
                    <EditableField
                      label="Email Address"
                      value={profile.email}
                      field="email"
                      type="email"
                    />
                    <EditableField
                      label="Phone Number"
                      value={profile.phone}
                      field="phone"
                    />
                    <EditableField
                      label="Department"
                      value={profile.department}
                      field="department"
                    />
                    {userType === "student" ? (
                      <EditableField
                        label="Current Semester"
                        value={`Semester ${profile.semester}`}
                        field="semester"
                        disabled={viewerType === "faculty"}
                      />
                    ) : (
                      <EditableField
                        label="Designation"
                        value={profile.designation}
                        field="designation"
                      />
                    )}
                    <div className="md:col-span-2">
                      <EditableField
                        label="Address"
                        value={profile.address}
                        field="address"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {userType === "student"
                      ? "Academic Information"
                      : "Professional Information"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {userType === "student" ? (
                      <>
                        <EditableField
                          label="Current Course"
                          value={profile.course}
                          field="course"
                          disabled={viewerType === "faculty"}
                        />
                        <EditableField
                          label="Enrollment Date"
                          value={profile.enrollmentDate}
                          field="enrollmentDate"
                          disabled={true}
                        />
                        <EditableField
                          label="Academic Year"
                          value={profile.year}
                          field="year"
                          disabled={viewerType === "faculty"}
                        />
                        <EditableField
                          label="Current Status"
                          value={profile.status}
                          field="status"
                          disabled={viewerType === "faculty"}
                        />
                      </>
                    ) : (
                      <>
                        <EditableField
                          label="Qualification"
                          value={profile.qualification}
                          field="qualification"
                        />
                        <EditableField
                          label="Specialization"
                          value={profile.specialization}
                          field="specialization"
                        />
                        <EditableField
                          label="Office Location"
                          value={profile.office}
                          field="office"
                        />
                        <EditableField
                          label="Office Hours"
                          value={profile.officeHours}
                          field="officeHours"
                        />
                        <EditableField
                          label="Joining Date"
                          value={profile.joiningDate}
                          field="joiningDate"
                          disabled={true}
                        />
                        <EditableField
                          label="Current Status"
                          value={profile.status}
                          field="status"
                          disabled={true}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && userType === "student" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Attendance Overview
                </h3>
                <div className="space-y-4">
                  {attendanceData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{item.month} 2024</p>
                        <p className="text-sm text-slate-400">
                          Monthly attendance
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${getAttendanceColor(
                            item.percentage
                          )}`}
                        >
                          {item.percentage}%
                        </p>
                        <div className="w-20 bg-slate-600 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.percentage >= 90
                                ? "bg-green-400"
                                : item.percentage >= 80
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "grades" && userType === "student" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Grade History</h3>
                <div className="space-y-3">
                  {gradeHistory.map((grade, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{grade.subject}</p>
                        <p className="text-sm text-slate-400">
                          {grade.semester} • {grade.credits} Credits
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-900 text-blue-300 font-medium">
                          {grade.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-slate-700 rounded-lg"
                    >
                      <div className="flex-shrink-0 p-2 bg-slate-600 rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.message}</p>
                        <p className="text-sm text-slate-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {userType === "student" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Overall Attendance</span>
                      <span
                        className={`font-bold ${getAttendanceColor(
                          profile.overallAttendance
                        )}`}
                      >
                        {profile.overallAttendance}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Grade</span>
                      <span className="font-bold text-blue-400">
                        {profile.currentGrade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">GPA</span>
                      <span className="font-bold text-purple-400">
                        {profile.gpa}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Semester</span>
                      <span className="font-bold text-white">
                        {profile.semester}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience</span>
                      <span className="font-bold text-blue-400">
                        {profile.experience}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Courses Handling</span>
                      <span className="font-bold text-purple-400">
                        {profile.coursesHandling?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department</span>
                      <span className="font-bold text-white">
                        {profile.department}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Designation</span>
                      <span className="font-bold text-green-400">
                        {profile.designation}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm">{profile.phone}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span className="text-sm">{profile.address}</span>
                </div>
              </div>
            </div>

            {userType === "faculty" && (
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold mb-4">Courses Handling</h3>
                <div className="space-y-2">
                  {profile.coursesHandling?.map(
                    (course: string, index: number) => (
                      <div key={index} className="p-3 bg-slate-700 rounded-lg">
                        <p className="text-sm font-medium text-white">
                          {course}
                        </p>
                      </div>
                    )
                  ) || (
                    <p className="text-slate-400 text-sm">
                      No courses assigned
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
