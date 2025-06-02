"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome Aboard!
          </h2>
          <p className="text-gray-600 mb-6">
            Your faculty account has been successfully created. You can now
            access the academic portal.
          </p>
          <button
            onClick={() => {
              setRedirecting(true);
              router.push("/faculty/dashboard");
            }}
            disabled={redirecting}
            className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 ${
              redirecting
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-blue-700 hover:to-indigo-700"
            }`}
          >
            {redirecting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Continue to Dashboard"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          value={name}
          disabled
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Employee ID *
        </label>
        <input
          type="text"
          value={empId}
          disabled
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department *
        </label>
        <select
          {...register("department")}
          className="hover:cursor-pointer w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="">Select department</option>
          <option value="Computer Science">Computer Science Engineering</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics">Electronics & Communication</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Civil">Civil Engineering</option>
          <option value="Electrical">Electrical Engineering</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Management">Management Studies</option>
        </select>
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Designation *
        </label>
        <select
          {...register("designation")}
          className="hover:cursor-pointer w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="">Select designation</option>
          <option value="Professor">Professor</option>
          <option value="Associate Professor">Associate Professor</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Senior Lecturer">Senior Lecturer</option>
          <option value="Lab Instructor">Lab Instructor</option>
        </select>
        {errors.designation && (
          <p className="text-red-500 text-sm">{errors.designation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Subject *
        </label>
        <select
          {...register("subjectId")}
          className="hover:cursor-pointer w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 bg-white text-gray-900"
        >
          <option value="">Select subject</option>
          {subjects.map((subj) => (
            <option key={subj.id} value={subj.id}>
              {subj.code} - {subj.name}
            </option>
          ))}
        </select>
        {errors.subjectId && (
          <p className="text-red-500 text-sm">{errors.subjectId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
      >
        {isSubmitting ? "Creating Account..." : "Create Faculty Account"}
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
