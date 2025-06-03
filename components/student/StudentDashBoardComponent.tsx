// app/dashboard/student/student-dashboard-client.tsx (Client Component)
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Calendar, GraduationCap, Clock } from "lucide-react";
import { User } from "@prisma/client";
import StudentAttendance from "@/components/student/attendance";
import StudentGrades from "@/components/student/grades";
import StudentSchedule from "@/components/student/schedule";
import RecentAnnouncements from "@/components/dashboard/recent-announcements";
import StatCard from "@/components/dashboard/stat-card";
import DashboardLayout from "../dashboard/DashboardLayout";

interface StudentDashboardComponentProps {
  user: User;
}

export function StudentDashboardComponent({
  user,
}: StudentDashboardComponentProps) {
  return (
    <DashboardLayout user={user}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name}
        </h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Overall GPA"
            value="3.7"
            description="Current semester"
            icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
            trend="up"
            trendValue="0.2"
          />
          <StatCard
            title="Attendance"
            value="92%"
            description="Last 30 days"
            icon={<Clock className="h-4 w-4 text-muted-foreground" />}
            trend="down"
            trendValue="2.1%"
          />
          <StatCard
            title="Classes Today"
            value="3"
            description="1 remaining"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Assignments"
            value="4"
            description="2 pending"
            icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Today&rsquo;s Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <StudentSchedule daily />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentAnnouncements />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Grade Overview</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <StudentGrades summary />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentSchedule />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Course Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentGrades />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
              </CardHeader>
              <CardContent>
                <StudentAttendance />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
