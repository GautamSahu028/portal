import { SignUpForm } from "@/auth/nextjs/components/SignUpForm";
import {
  GraduationCap,
  ArrowLeft,
  Users,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default async function SignUp() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements - matching landing page */}
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

      {/* Grid Pattern - matching landing page */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Navigation Bar - matching landing page */}
      <nav className="bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
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
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md relative">
          {/* Header Section */}
          <div className="text-center mb-8 space-y-6">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle size={14} className="text-white" />
              </div>
              <span className="text-sm text-white font-semibold tracking-wide">
                Join 500+ Institutions
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

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                <span className="block">Join the</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300">
                  Future
                </span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed">
                Create your account and transform your
                <span className="text-blue-200 font-semibold">
                  {" "}
                  educational experience
                </span>
              </p>
            </div>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative">
              <SignUpForm />
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg">
              <p className="text-slate-200 text-sm mb-2">
                Already have an account?
              </p>
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 font-bold shadow-lg hover:shadow-xl px-6 py-3 rounded-xl text-sm transform hover:scale-105 transition-all duration-300 group"
              >
                Sign In Instead
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Zap size={20} className="text-blue-300" />
              </div>
              <div className="text-xs text-white font-medium mb-1">
                AI-Powered
              </div>
              <div className="text-xs text-slate-400">
                Smart tracking technology
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Users size={20} className="text-emerald-300" />
              </div>
              <div className="text-xs text-white font-medium mb-1">
                500+ Schools
              </div>
              <div className="text-xs text-slate-400">Trusted globally</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <CheckCircle size={20} className="text-indigo-300" />
              </div>
              <div className="text-xs text-white font-medium mb-1">
                99.9% Uptime
              </div>
              <div className="text-xs text-slate-400">Always available</div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Star size={20} className="text-orange-300" />
              </div>
              <div className="text-xs text-white font-medium mb-1">
                5-Star Rated
              </div>
              <div className="text-xs text-slate-400">
                Top user satisfaction
              </div>
            </div>
          </div>

          {/* Demo Environment Alert */}
          <div className="mt-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-white fill-current" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-amber-100 text-sm">
                  🚀 Demo Environment
                </p>
                <p className="text-amber-200 text-xs leading-relaxed">
                  Register as <strong>faculty</strong> to explore our advanced
                  administrative features with pre-loaded demo data.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl rounded-2xl border border-blue-400/30 flex items-center justify-center shadow-xl animate-bounce opacity-60">
          <Users size={20} className="text-blue-300" />
        </div>

        <div className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-indigo-400/30 flex items-center justify-center shadow-xl animate-pulse opacity-60">
          <Zap size={16} className="text-indigo-300" />
        </div>

        <div
          className="absolute top-1/3 left-12 w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-xl rounded-2xl border border-emerald-400/30 flex items-center justify-center shadow-xl animate-spin opacity-60"
          style={{ animationDuration: "8s" }}
        >
          <Star size={18} className="text-emerald-300 fill-current" />
        </div>
      </div>
    </div>
  );
}
