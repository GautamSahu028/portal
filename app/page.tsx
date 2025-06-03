import { getCurrentUser } from "@/auth/nextjs/currentUser";
import {
  GraduationCap,
  CalendarCheck,
  AlertTriangle,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Star,
} from "lucide-react";

import { LogOutButton } from "@/auth/nextjs/components/LogOutButton";
import { LoadingButton } from "@/components/Buttons/LoadingButton";

export default async function HomePage() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  EduManage
                </span>
                <div className="text-xs text-blue-300 font-medium tracking-wide">
                  PROFESSIONAL
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <span className="text-sm text-white font-semibold tracking-wide">
                  Trusted by 500+ Institutions
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  <span className="block">Future of</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300">
                    Attendance
                  </span>
                  <span className="block text-4xl lg:text-5xl text-slate-300 font-light mt-2">
                    Management
                  </span>
                </h1>

                <p className="text-xl text-slate-200 leading-relaxed max-w-2xl">
                  Transform your institution with AI-powered attendance
                  tracking.
                  <span className="text-blue-200 font-semibold">
                    {" "}
                    Smart, Secure, Seamless.
                  </span>
                </p>
              </div>

              {fullUser ? (
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md mx-auto lg:mx-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">
                          {fullUser.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {fullUser.name}
                      </h3>
                      <p className="text-blue-200 text-sm capitalize flex items-center gap-2">
                        <Shield size={14} />
                        {fullUser.role.toLowerCase()} Account
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <LoadingButton
                      href={
                        fullUser.role === "FACULTY"
                          ? "/faculty/dashboard"
                          : "/student/dashboard"
                      }
                      className="w-full bg-white text-slate-900 hover:bg-slate-100 border-0 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 py-4"
                    >
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Access Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </LoadingButton>
                    <LogOutButton />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <LoadingButton
                      href="/sign-up"
                      className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 font-bold shadow-2xl hover:shadow-3xl px-10 py-4 text-lg transform hover:scale-105 transition-all duration-300 group"
                    >
                      <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </LoadingButton>
                    <LoadingButton
                      href="/sign-in"
                      className="bg-white/10 backdrop-blur border-2 border-white/30 text-white hover:bg-white/20 font-bold px-10 py-4 text-lg hover:border-white/50 transition-all duration-300"
                    >
                      Sign In
                    </LoadingButton>
                  </div>
                </div>
              )}
            </div>

            {/* Right visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Dashboard Mockup */}
                <div className="w-96 h-96 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-105">
                  <CalendarCheck
                    size={140}
                    className="text-white/90 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 flex items-center justify-center shadow-xl animate-bounce">
                  <Users size={28} className="text-blue-300" />
                </div>

                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-indigo-400/30 flex items-center justify-center shadow-xl animate-pulse">
                  <BarChart3 size={32} className="text-indigo-300" />
                </div>

                <div
                  className="absolute top-1/2 -left-12 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-xl rounded-2xl border border-emerald-400/30 flex items-center justify-center shadow-xl animate-spin"
                  style={{ animationDuration: "8s" }}
                >
                  <Shield size={24} className="text-emerald-300" />
                </div>

                <div className="absolute top-8 left-1/2 w-18 h-18 bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-xl rounded-2xl border border-orange-400/30 flex items-center justify-center shadow-xl animate-ping">
                  <Globe size={26} className="text-orange-300" />
                </div>

                {/* Glow Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Alert for Test Users */}
      <section className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-b border-amber-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-orange-100/50 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start gap-6 bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-2">
              <p className="font-bold text-amber-900 text-lg">
                🚀 Demo Environment
              </p>
              <p className="text-amber-800 leading-relaxed">
                Experience our platform with pre-loaded student data for{" "}
                <strong>&quot;Data Structures and Algorithms&quot;</strong>.
                Register as a <strong>faculty member</strong> to explore
                advanced features and administrative capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              ✨ POWERFUL FEATURES
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-tight">
              Everything You Need,
              <br />
              <span className="text-blue-600">Nothing You Don&apos;t</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines simplicity with powerful
              features to handle all your attendance tracking needs efficiently
              and accurately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="AI-Powered Capture"
              description="Advanced facial recognition with 99.9% accuracy, instant QR codes, and smart backup options for seamless attendance marking."
              icon={<CalendarCheck className="w-8 h-8" />}
              gradient="from-blue-500 to-cyan-500"
              delay="0s"
            />
            <FeatureCard
              title="Real-time Analytics"
              description="Beautiful dashboards with live insights, predictive analytics, and comprehensive reporting for data-driven decisions."
              icon={<BarChart3 className="w-8 h-8" />}
              gradient="from-indigo-500 to-purple-500"
              delay="0.2s"
            />
            <FeatureCard
              title="Smart Automation"
              description="Automated notifications, intelligent scheduling, and seamless integration with existing systems for maximum efficiency."
              icon={<Zap className="w-8 h-8" />}
              gradient="from-purple-500 to-pink-500"
              delay="0.4s"
            />
            <FeatureCard
              title="Enterprise Security"
              description="Bank-level encryption, GDPR compliance, and robust access controls to keep your data safe and secure."
              icon={<Shield className="w-8 h-8" />}
              gradient="from-emerald-500 to-teal-500"
              delay="0.6s"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Trusted Worldwide
            </h3>
            <p className="text-slate-300 text-lg">
              Join thousands of institutions already using EduManage
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <StatCard
              number="99.9%"
              label="Accuracy Rate"
              icon={<CheckCircle />}
            />
            <StatCard number="&lt;1s" label="Response Time" icon={<Zap />} />
            <StatCard number="24/7" label="Uptime SLA" icon={<Shield />} />
            <StatCard number="500+" label="Institutions" icon={<Globe />} />
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Institution?
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join the future of attendance management. Start your free trial
            today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <LoadingButton
              href="/sign-up"
              className="bg-white text-slate-900 hover:bg-slate-100 border-0 font-bold shadow-2xl hover:shadow-3xl px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300 group"
            >
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </LoadingButton>
            <div className="text-blue-200 text-sm">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              30-day free trial • No setup fees • Cancel anytime
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="flex items-center justify-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-bold">EduManage</span>
                <div className="text-xs text-slate-400 font-medium tracking-wide">
                  PROFESSIONAL
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300 text-lg font-medium">
                Transforming Education Through Smart Technology
              </p>
              <div className="flex justify-center gap-8 text-sm text-slate-400">
                <span>🔒 Enterprise Security</span>
                <span>🚀 99.9% Uptime</span>
                <span>📊 Real-time Analytics</span>
                <span>🌍 Global Support</span>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-700">
              <p className="text-slate-500 text-sm">
                © 2025 EduManage. All rights reserved. Built with precision for
                academic excellence.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: string;
}) {
  return (
    <div className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 transform hover:-translate-y-2 hover:scale-105">
      <div
        className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}

// function StatCard({
//   number,
//   label,
//   icon,
// }: {
//   number: string;
//   label: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="group text-center space-y-4 p-6 rounded-2xl hover:bg-white/5 transition-all duration-300">
//       <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
//         <div className="text-blue-300 w-8 h-8">{icon}</div>
//       </div>
//       <div className="text-4xl lg:text-5xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
//         {number}
//       </div>
//       <div className="text-slate-300 text-sm uppercase tracking-wider font-semibold group-hover:text-white transition-colors duration-300">
//         {label}
//       </div>
//     </div>
//   );
// }
