"use client";

import { useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

export default function EditableAttendanceTable({ data }: { data: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [status, setStatus] = useState("PRESENT");
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    setStatus(entry.status);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!selectedEntry) return;
    setIsSaving(true);

    try {
      await axios.post("/api/updateAttendance", {
        studentId: selectedEntry.studentId,
        courseId: selectedEntry.courseId,
        date: selectedEntry.date,
        status,
      });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update attendance", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <TableBody>
        {data.map((entry: any, index: number) => (
          <TableRow
            key={index}
            className="border-border hover:bg-muted transition"
          >
            <TableCell>{entry.roll}</TableCell>
            <TableCell>{entry.name}</TableCell>
            <TableCell>{entry.course}</TableCell>
            <TableCell>{entry.semester}</TableCell>
            <TableCell
              className={
                entry.status === "PRESENT" ? "text-green-500" : "text-red-500"
              }
            >
              {entry.status}
            </TableCell>
            <TableCell>{entry.percentage}%</TableCell>
            <TableCell>
              {entry.date
                ? new Date(entry.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </TableCell>
            <TableCell className="text-center">
              <button
                className="text-primary hover:text-primary/80 transition"
                onClick={() => handleEdit(entry)}
                title="Edit Attendance"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-background border border-border shadow-xl rounded-xl p-6 w-full max-w-md text-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Edit Attendance
            </DialogTitle>
          </DialogHeader>

          {selectedEntry && (
            <div className="space-y-6">
              <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {selectedEntry.name}
                </p>
                <p>
                  Roll Number:{" "}
                  <span className="text-muted-foreground">
                    {selectedEntry.roll}
                  </span>
                </p>
                <p>
                  Course:{" "}
                  <span className="text-muted-foreground">
                    {selectedEntry.course}
                  </span>
                </p>
                <p>
                  Date:{" "}
                  <span className="text-muted-foreground">
                    {new Date(selectedEntry.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Attendance Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-muted border border-border text-foreground focus:ring-2 focus:ring-primary rounded-md px-4 py-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-muted border border-border text-foreground">
                    <SelectItem value="PRESENT">PRESENT</SelectItem>
                    <SelectItem value="ABSENT">ABSENT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
