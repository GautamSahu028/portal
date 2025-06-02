"use client";

import { Subject } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubjectId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/course/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facultyId,
          subjectId: selectedSubjectId,
        }),
      });

      if (res.ok) {
        setOpen(false);
        setSelectedSubjectId("");
        router.refresh();
      } else {
        console.error("Failed to create course");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg bg-primary/20 text-foreground hover:bg-primary/10 hover:cursor-pointer font-medium transition"
      >
        + Register Course
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background text-foreground rounded-2xl w-full max-w-md p-6 border border-border shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Register New Course</h2>
              <button
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Select Subject
                </label>
                <select
                  required
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground"
                >
                  <option value="">-- Select a Subject --</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedSubjectId || isSubmitting}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    !selectedSubjectId || isSubmitting
                      ? "bg-green-600/50 text-white cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
