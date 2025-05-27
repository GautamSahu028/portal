"use client";

import { useState, useRef } from "react";
import { Client } from "@gradio/client";
import ErrorMessage from "./ui/ErrorMessage";
import LoadingIndicator from "./ui/LoadingIndicator";
import AttendanceHeader from "./AttendanceHeader";
import AttendanceImage from "./AttendanceImage";
import AttendanceResults from "./AttendanceResults";
import EmptyState from "./EmptyState";
import StatusMessage from "./StatusMessage";
import CameraComponent from "./CameraComponent";
import axios from "axios";
import {
  AttendanceOutput,
  AttendanceRecord,
  FacultyCourse,
} from "@/utils/types";
import FutureScope from "./FutureScope";
import {
  getCombinedAttendance,
  parseAttendanceData,
} from "./utils/utilityFunctions";
import db from "@/utils/db";
import { toast } from "sonner";

function AttendanceComponent({ courses }: { courses: FacultyCourse[] }) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState("none"); // "none", "uploaded", "processed"
  const [fullAttendanceRecords, setFullAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [finalAttendance, setFinalAttendance] = useState<AttendanceOutput[]>(
    []
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinalAttendance, setIsFinalAttendance] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [courseSelectionError, setCourseSelectionError] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Get today's date in a readable format
  function getTodayDate() {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Handle file selection
  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  function handleFileChange(event: FileChangeEvent) {
    const file = event.target.files[0];
    setError(null);
    setFullAttendanceRecords([]);
    setFinalAttendance([]);

    if (!file) return;

    // Validate that the file is an image
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPEG, PNG, etc.)");
      return;
    }

    handleImageSelected(file);
  }

  // Common function to handle image from file input or camera
  function handleImageSelected(file: File, preview?: string) {
    setUploadedImage(file);
    setAttendanceStatus("uploaded");

    // Create image preview if not provided
    if (preview) {
      setImagePreview(preview);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    // Show success message
    toast(
      preview
        ? "Image has been successfully captured!"
        : "Image has been successfully uploaded!"
    );
  }

  // Handle click on the empty state container
  function handleEmptyStateClick() {
    fileInputRef.current?.click();
  }

  // Open camera
  function openCamera() {
    setIsCameraOpen(true);
    setError(null);
  }

  // Handle camera capture
  function handleCameraCapture(capturedFile: File, preview: string) {
    setIsCameraOpen(false);
    handleImageSelected(capturedFile, preview);
  }

  // Handle camera close
  function handleCameraClose() {
    setIsCameraOpen(false);
  }

  // Handle course selection
  function handleCourseSelect(courseId: string) {
    setSelectedCourseId(courseId);
    setCourseSelectionError(null);
  }

  // Process attendance report
  async function handleTakeAttendance() {
    // Check if course is selected
    if (!selectedCourseId) {
      setCourseSelectionError(
        "Please select a course before taking attendance"
      );
      return;
    }

    if (uploadedImage) {
      try {
        setIsProcessing(true);
        setIsFinalAttendance(false);
        setCourseSelectionError(null);

        // Actual API implementation with Gradio client
        const client = await Client.connect("turing5577/face-recognition");
        const result = await client.predict("/predict", {
          image: uploadedImage, // Pass the uploaded image blob directly
        });

        // The API returns a single string with all faces, so we need to split it
        const facesData = (result.data as string[])[0].split("\\n");
        const split_faces = facesData[0].split("\n");
        const parseSplitFaces = parseAttendanceData(
          split_faces,
          selectedCourse?.code ?? "N/A"
        );
        const { finalAttendance, fullAttendanceRecords } =
          getCombinedAttendance(courses, parseSplitFaces);
        setFinalAttendance(finalAttendance);
        console.log("FinalAttendance : ", finalAttendance);
        setFullAttendanceRecords(fullAttendanceRecords);

        // Here you would also send the selectedCourseId to your database
        console.log("Selected Course ID for attendance:", selectedCourseId);

        toast(`Attendance recorded for ${split_faces.length} people!`);
      } catch (err) {
        console.error("API Error:", err);
        setError(`Failed to process attendance: ${(err as Error).message}`);
      } finally {
        setIsProcessing(false);
        setIsFinalAttendance(true);
        setAttendanceStatus("processed");
      }
    } else {
      toast("Please upload or capture an attendance image first.");
    }
  }

  async function upsertFinalAttendance(finalAttendance: AttendanceOutput[]) {
    try {
      setIsProcessing(true);

      const response = await axios.post(
        "/api/upsertAttendance",
        finalAttendance,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast("Successfully uploaded data to database");
      } else {
        console.error("Upload failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error in upserting attendance:", error);
    } finally {
      setIsProcessing(false);
      setAttendanceStatus("DBuploaded");
    }
  }

  // Get selected course details
  const selectedCourse = courses.find(
    (course) => course.id === selectedCourseId
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="p-6 space-y-6">
        <AttendanceHeader
          getTodayDate={getTodayDate}
          handleTakeAttendance={handleTakeAttendance}
          isProcessing={isProcessing}
          uploadedImage={uploadedImage}
          isFinalAttendance={isFinalAttendance}
          upsertAttendance={upsertFinalAttendance}
          finalAttendance={finalAttendance}
        />

        {/* Course Selection Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Select Course
              </h2>
              <p className="text-sm text-slate-400">
                Choose the course for attendance tracking
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="course-select"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Course Selection
              </label>
              <select
                id="course-select"
                value={selectedCourseId}
                onChange={(e) => handleCourseSelect(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">-- Select a Course --</option>
                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                    className="bg-slate-700"
                  >
                    {course.code} - {course.name} (
                    {course.enrolledStudentsCount} students)
                  </option>
                ))}
              </select>
            </div>

            {/* Course Selection Error */}
            {courseSelectionError && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-300">
                  {courseSelectionError}
                </p>
              </div>
            )}

            {/* Selected Course Info */}
            {selectedCourse && (
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-300">
                    Selected Course: {selectedCourse.code} -{" "}
                    {selectedCourse.name}
                  </h3>
                  <p className="text-sm text-blue-400 mt-1">
                    Enrolled Students: {selectedCourse.enrolledStudentsCount}
                    {selectedCourse.description && (
                      <span className="ml-2">
                        • {selectedCourse.description}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Camera Component */}
        {isCameraOpen && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
            <CameraComponent
              onCapture={handleCameraCapture}
              onClose={handleCameraClose}
            />
          </div>
        )}

        {/* Image Upload and Results Section */}
        {uploadedImage && imagePreview && !isCameraOpen && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Attendance Processing
                </h2>
                <p className="text-sm text-slate-400">
                  Review uploaded image and attendance results
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Image container with proper constraints */}
              <div className="min-w-0 overflow-hidden">
                <AttendanceImage
                  imagePreview={imagePreview}
                  uploadedImage={uploadedImage}
                />
              </div>

              <div className="space-y-6 min-w-0">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">
                    Processing Status
                  </h3>
                  <StatusMessage
                    status={attendanceStatus}
                    getTodayDate={getTodayDate}
                  />
                </div>

                {/* Loading Indicator */}
                {isProcessing && <LoadingIndicator />}

                {/* Attendance Results */}
                {fullAttendanceRecords.length > 0 && (
                  <AttendanceResults results={fullAttendanceRecords} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!uploadedImage && !isCameraOpen && !error && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 relative overflow-hidden">
            {/* Camera Button */}
            <div className="flex items-center justify-end p-4 mr-4">
              {/* Camera Button - Now in header for better alignment */}
              <button
                onClick={openCamera}
                className="hover:cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Open Camera
              </button>
            </div>

            {/* Empty State Content */}
            <div className="px-8 py-4">
              <EmptyState onClick={handleEmptyStateClick} />
            </div>
          </div>
        )}

        {/* Future Scope Section */}
        <FutureScope />
      </div>
    </div>
  );
}

export default AttendanceComponent;
