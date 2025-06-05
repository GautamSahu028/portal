"use client";

import { Subject } from "@prisma/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Plus, X, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";

export default function CourseRegister({
  facultyId,
  subjects,
}: {
  facultyId: string;
  subjects: Subject[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId) return;

    setIsSubmitting(true);
    setErrorMessage(""); // clear previous error

    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, subjectId: selectedSubjectId }),
      });

      if (res.ok) {
        setOpen(false);
        setSelectedSubjectId("");
        router.refresh();
      } else {
        const text = await res.text();
        setErrorMessage(text || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    if (open) {
      setErrorMessage(""); // reset error on open
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const ModalContent = () => (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div
        className="fixed inset-0"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div className="bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border border-white/30 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-300">
        <div className="absolute inset-0 pointer-events-none z-[0]">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div
            className="absolute bottom-4 left-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative p-8 z-[1]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Register Course
                </h2>
                <p className="text-white/60 text-sm">
                  Add a new course to teach
                </p>
              </div>
            </div>
            <button
              className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 group"
              onClick={() => setOpen(false)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-bold text-white mb-3">
                Select Subject
              </label>
              <div className="relative">
                <select
                  required
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm text-white appearance-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-300"
                >
                  <option value="" className="bg-slate-800 text-white">
                    -- Select a Subject --
                  </option>
                  {subjects.map((subject) => (
                    <option
                      key={subject.id}
                      value={subject.id}
                      className="bg-slate-800 text-white"
                    >
                      {subject.code} - {subject.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 text-red-300 text-sm rounded-xl px-4 py-3">
                {errorMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 group"
              >
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={!selectedSubjectId || isSubmitting}
                className={`flex-1 inline-flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl transition-all duration-300 group ${
                  !selectedSubjectId || isSubmitting
                    ? "bg-emerald-600/50 text-white/70 cursor-not-allowed border border-emerald-500/30"
                    : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    Create Course
                  </>
                )}
              </button>
            </div>

            {/* Info Message */}
            <div className="bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4 mt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-300 mt-0.5" />
                <div>
                  <p className="text-blue-200 text-sm font-medium">
                    Course Registration
                  </p>
                  <p className="text-blue-300/80 text-xs mt-1">
                    Once registered, you&apos;ll be able to manage assignments,
                    grades, and student enrollment for this course.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white border-0 font-bold shadow-lg hover:shadow-xl px-6 py-3 rounded-xl text-sm transform hover:scale-105 transition-all duration-300 group"
      >
        <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
        Register Course
      </button>

      {open && mounted && createPortal(<ModalContent />, document.body)}
    </>
  );
}
