"use client";

import React, { useState, useRef, useEffect } from "react";

interface CameraComponentProps {
  onCapture: (imageFile: File, imagePreview: string) => void;
  onClose: () => void;
}

function CameraComponent({ onCapture, onClose }: CameraComponentProps) {
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const isMountedRef = useRef<boolean>(true); // Track if component is mounted

  // Initialize camera on component mount
  useEffect(() => {
    isMountedRef.current = true;

    const initTimer = setTimeout(() => {
      if (isMountedRef.current) {
        initializeCamera();
      }
    }, 100);

    // ✅ Snapshot the current ref value here
    const videoElement = videoRef.current;

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimer);

      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      // ✅ Use the snapshot instead of videoRef.current
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [cameraStream, initializeCamera]);

  async function initializeCamera() {
    try {
      setError(null);

      // Clean up any existing stream first
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      // Check if component is still mounted
      if (!isMountedRef.current) {
        // Clean up if component unmounted during async operation
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      setCameraStream(stream);

      // Set the stream to the video element
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Set up event listeners before calling play()
        videoRef.current.onloadedmetadata = () => {
          if (!isMountedRef.current || !videoRef.current) return;

          // Try playing the video after metadata is loaded
          const playPromise = videoRef.current.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                if (isMountedRef.current) {
                  setIsReady(true);
                }
              })
              .catch((err) => {
                if (isMountedRef.current) {
                  console.error("Error playing video:", err);
                  setError(`Failed to play video: ${err.message}`);
                }
              });
          }
        };
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error("Camera access error:", err);
        setError(`Camera access failed: ${(err as Error).message}`);
      }
    }
  }

  function handleCapture() {
    try {
      if (!videoRef.current || !canvasRef.current) {
        setError("Camera or canvas reference not available");
        return;
      }

      if (!isReady) {
        setError("Video stream not ready yet. Please wait a moment.");
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Draw the current video frame to the canvas
      const context = canvas.getContext("2d");
      if (!context) {
        setError("Could not get canvas context");
        return;
      }

      // Clear the canvas and draw video frame
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image as data URL
      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);

      // Convert to blob and create File
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Failed to create image blob");
            return;
          }

          // Create a File object from the blob
          const capturedFile = new File([blob], "captured-image.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          // Send captured image back to parent component
          onCapture(capturedFile, imageDataUrl);
        },
        "image/jpeg",
        0.9
      );
    } catch (err) {
      console.error("Capture error:", err);
      setError(`Failed to capture image: ${(err as Error).message}`);
    }
  }

  function handleClose() {
    // Clean up camera stream
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    onClose();
  }

  return (
    <div className="border border-border rounded-xl bg-muted p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Camera</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCapture}
            disabled={!isReady}
            className={`px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 ${
              isReady
                ? "bg-primary text-white hover:bg-primary/90 focus:ring-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isReady ? "Capture" : "Initializing..."}
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-destructive text-white hover:bg-destructive/90 focus:outline-none focus:ring-2 focus:ring-destructive"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Camera View */}
      <div className="overflow-hidden rounded-lg border border-border bg-background flex justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-h-[500px] object-contain rounded"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Loading Indicator */}
      {!isReady && !error && (
        <div className="mt-4 text-center text-muted-foreground text-sm flex justify-center items-center gap-2">
          <div className="w-4 h-4 border-2 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
          Initializing camera...
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
