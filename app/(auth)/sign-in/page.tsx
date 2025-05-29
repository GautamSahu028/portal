import { SignInForm } from "@/auth/nextjs/components/SignInForm";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default async function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-6 text-white hover:text-blue-200 transition-colors"
          >
            <GraduationCap size={32} />
            <span className="text-2xl font-bold">EduManage</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-blue-100">Sign in to your account to continue</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <SignInForm />
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-blue-100 text-sm">
            No account?{" "}
            <Link
              href="/sign-up"
              className="text-white font-semibold hover:text-blue-200 transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
