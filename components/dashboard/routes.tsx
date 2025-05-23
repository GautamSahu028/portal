import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  MessageSquare,
  Users,
} from "lucide-react";

export const getFacultyNavItems = () => [
  {
    title: "Dashboard",
    href: "/faculty/dashboard",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Students",
    href: "/faculty/students",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    href: "/faculty/attendance",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Grades",
    href: "/faculty/grades",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Courses",
    href: "/faculty/courses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Announcements",
    href: "/faculty/announcements",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/faculty/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];

export const getStudentNavItems = () => [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/student/profile",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Attendance",
    href: "/student/attendance",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Grades",
    href: "/student/grades",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Schedule",
    href: "/student/schedule",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Announcements",
    href: "/student/announcements",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/student/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
];
