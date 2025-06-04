"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, GraduationCap, Users, Star, Zap } from "lucide-react";
import { FacultyOnboardingSchema } from "@/auth/nextjs/schemas";
import { useRouter } from "next/navigation";
import { Subject } from "@prisma/client";

type FacultyOnboardingFormData = z.infer<typeof FacultyOnboardingSchema> & {
  subjectId: string;
};

export default function FacultyOnboardingForm({
  id,
  name,
  email,
  subjects,
}: {
  id: string;
  name: string;
  email: string;
  subjects: Subject[];
}) {
  const empId = uuidToEmployeeId(id);
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FacultyOnboardingFormData>({
    resolver: zodResolver(FacultyOnboardingSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FacultyOnboardingFormData): Promise<void> => {
    const finalData = {
      userId: id,
      employeeId: empId,
      department: data.department,
      designation: data.designation,
      subjectId: data.subjectId,
    };

    const res = await fetch("/api/faculty/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (!res.ok) {
      console.error("Failed to create faculty");
      return;
    }

    const result = await res.json();
    console.log("Faculty created:", result);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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

        <div className="flex-1 flex items-center justify-center p-4 relative">
          <div className="w-full max-w-md relative">
            {/* Success Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-center group relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl blur-3xl opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>

                {/* Header */}
                <h2 className="text-3xl font-bold text-white mb-4">
                  Welcome Aboard!
                </h2>
                <p className="text-slate-200 mb-8 text-lg leading-relaxed">
                  Your faculty account has been successfully created. You can
                  now access the academic portal.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <GraduationCap size={16} className="text-blue-300" />
                    </div>
                    <div className="text-xs text-white font-medium">
                      Smart Dashboard
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users size={16} className="text-emerald-300" />
                    </div>
                    <div className="text-xs text-white font-medium">
                      Student Analytics
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRedirecting(true);
                    router.push("/faculty/dashboard");
                  }}
                  disabled={redirecting}
                  className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 font-bold shadow-lg hover:shadow-xl px-6 py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 group ${
                    redirecting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {redirecting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Continue to Dashboard
                      <Zap className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Full Name *
        </label>
        <input
          type="text"
          value={name}
          disabled
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Email *
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
        />
      </div>

      {/* Employee ID */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Employee ID *
        </label>
        <input
          type="text"
          value={empId}
          disabled
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-slate-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
        />
      </div>

      {/* Department */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Department *
        </label>
        <select
          {...register("department")}
          className="hover:cursor-pointer w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 [&>option]:bg-slate-800 [&>option]:text-white"
        >
          <option value="" className="bg-slate-800 text-slate-400">
            Select department
          </option>
          <option value="Computer Science" className="bg-slate-800">
            Computer Science Engineering
          </option>
          <option value="Information Technology" className="bg-slate-800">
            Information Technology
          </option>
          <option value="Electronics" className="bg-slate-800">
            Electronics & Communication
          </option>
          <option value="Mechanical" className="bg-slate-800">
            Mechanical Engineering
          </option>
          <option value="Civil" className="bg-slate-800">
            Civil Engineering
          </option>
          <option value="Electrical" className="bg-slate-800">
            Electrical Engineering
          </option>
          <option value="Mathematics" className="bg-slate-800">
            Mathematics
          </option>
          <option value="Physics" className="bg-slate-800">
            Physics
          </option>
          <option value="Chemistry" className="bg-slate-800">
            Chemistry
          </option>
          <option value="Management" className="bg-slate-800">
            Management Studies
          </option>
        </select>
        {errors.department && (
          <p className="text-red-400 text-sm font-medium flex items-center gap-1">
            {errors.department.message}
          </p>
        )}
      </div>

      {/* Designation */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Designation *
        </label>
        <select
          {...register("designation")}
          className="hover:cursor-pointer w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 [&>option]:bg-slate-800 [&>option]:text-white"
        >
          <option value="" className="bg-slate-800 text-slate-400">
            Select designation
          </option>
          <option value="Professor" className="bg-slate-800">
            Professor
          </option>
          <option value="Associate Professor" className="bg-slate-800">
            Associate Professor
          </option>
          <option value="Assistant Professor" className="bg-slate-800">
            Assistant Professor
          </option>
          <option value="Lecturer" className="bg-slate-800">
            Lecturer
          </option>
          <option value="Senior Lecturer" className="bg-slate-800">
            Senior Lecturer
          </option>
          <option value="Lab Instructor" className="bg-slate-800">
            Lab Instructor
          </option>
        </select>
        {errors.designation && (
          <p className="text-red-400 text-sm font-medium flex items-center gap-1">
            {errors.designation.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Select Subject *
        </label>
        <select
          {...register("subjectId")}
          className="hover:cursor-pointer w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 [&>option]:bg-slate-800 [&>option]:text-white"
        >
          <option value="" className="bg-slate-800 text-slate-400">
            Select subject
          </option>
          {subjects.map((subj) => (
            <option key={subj.id} value={subj.id} className="bg-slate-800">
              {subj.code} - {subj.name}
            </option>
          ))}
        </select>
        {errors.subjectId && (
          <p className="text-red-400 text-sm font-medium flex items-center gap-1">
            {errors.subjectId.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`hover:cursor-pointer w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-0 font-bold shadow-lg hover:shadow-xl px-6 py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 group ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            Create Faculty Account
            <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

function uuidToEmployeeId(uuid: string): string {
  let hash = 0;
  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = (hash * 31 + char) % 1_000_000;
  }
  return `EMP${hash.toString().padStart(6, "0")}`;
}
