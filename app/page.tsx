import { LogOutButton } from "@/auth/nextjs/components/LogOutButton";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  Layers,
  Users,
  MessageCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { LoadingButton } from "@/components/Buttons/LoadingButton";

export default async function HomePage() {
  // const fullUser = null;
  const fullUser = await getCurrentUser({ withFullUser: true });
  // console.log("fullUser : ", fullUser);
  // const fullUser = { id: "1", name: "saitama", role: "user" };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-4 sm:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                <GraduationCap size={24} />
                <span className="text-sm font-medium">
                  Education Management Platform
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Edu<span className="text-blue-200">Manage</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-2xl">
                Streamline your educational institution with our comprehensive
                student management system
              </p>

              {fullUser == null ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <LoadingButton
                    href="/sign-in"
                    size="lg"
                    className="custom-styles"
                    variant="outline"
                  >
                    Sign In
                  </LoadingButton>
                  <LoadingButton
                    href="/sign-up"
                    size="lg"
                    className="custom-styles"
                    variant="outline"
                  >
                    Get Started
                  </LoadingButton>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{fullUser.name}</h3>
                      <p className="text-blue-200 text-sm capitalize">
                        {fullUser.role.toLowerCase()} Account
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <LoadingButton
                      href={
                        fullUser.role === "FACULTY"
                          ? "/faculty/dashboard"
                          : "/student/dashboard"
                      }
                      className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-lg"
                    >
                      DashBoard
                    </LoadingButton>

                    <LogOutButton />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                  <GraduationCap
                    size={120}
                    className="text-white drop-shadow-lg"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen size={32} className="text-yellow-800" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar size={28} className="text-green-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to manage students, track progress, and
              enhance learning experiences in one integrated platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Student Management"
              description="Comprehensive student profiles with academic history, contact information, and personalized tracking."
              color="blue"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Attendance Tracking"
              description="Mark and monitor attendance with detailed reports, statistics, and automated notifications."
              color="green"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Grade Management"
              description="Record and analyze student performance across different assessment types with detailed analytics."
              color="purple"
            />
            <FeatureCard
              icon={<Layers className="w-8 h-8" />}
              title="Course Management"
              description="Create and manage courses with detailed scheduling, enrollment, and curriculum planning."
              color="orange"
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Announcements"
              description="Share important information with students and faculty members through targeted notifications."
              color="red"
            />
            <FeatureCard
              icon={<MessageCircle className="w-8 h-8" />}
              title="Communication Hub"
              description="Direct messaging between students and faculty for personalized support and collaboration."
              color="indigo"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-slate-300">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-slate-300">Faculty Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                1000+
              </div>
              <div className="text-slate-300">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                99.9%
              </div>
              <div className="text-slate-300">System Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap size={32} className="text-blue-400" />
                <h3 className="text-2xl font-bold">EduManage</h3>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Empowering educational institutions with comprehensive
                management solutions for the digital age.
              </p>
              <div className="text-sm text-slate-400">
                © 2025 EduManage. All rights reserved.
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Quick Links</h4>
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Register
                </Link>
                <Link
                  href="#"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-200">Legal</h4>
              <div className="space-y-2">
                <Link
                  href="#"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Cookie Policy
                </Link>
                <Link
                  href="#"
                  className="block text-slate-300 hover:text-blue-400 transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm">
                Built with Next.js, Tailwind CSS, and shadcn/ui
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  System Operational
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "green" | "purple" | "orange" | "red" | "indigo";
}) {
  const colorClasses = {
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    red: "bg-red-500 text-white",
    indigo: "bg-indigo-500 text-white",
  };

  return (
    <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-1">
      <div
        className={`w-16 h-16 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
