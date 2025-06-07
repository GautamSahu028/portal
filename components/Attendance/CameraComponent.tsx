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

    const videoElement = videoRef.current;

    const initializeCamera = async () => {
      try {
        setError(null);

        setCameraStream((prevStream) => {
          if (prevStream) {
            prevStream.getTracks().forEach((track) => track.stop());
          }
          return null;
        });

        if (videoElement) {
          videoElement.srcObject = null;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (!isMountedRef.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        setCameraStream(stream);

        if (videoElement) {
          videoElement.srcObject = stream;

          videoElement.onloadedmetadata = () => {
            if (!isMountedRef.current || !videoElement) return;

            const playPromise = videoElement.play();
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
    };

    const initTimer = setTimeout(() => {
      initializeCamera();
    }, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimer);
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, []); // ✅ No dependencies

  // async function initializeCamera() {
  //   try {
  //     setError(null);

  //     // Clean up any existing stream first
  //     if (cameraStream) {
  //       cameraStream.getTracks().forEach((track) => track.stop());
  //     }

  //     if (videoRef.current) {
  //       videoRef.current.srcObject = null;
  //     }

  //     // Request camera access
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: {
  //         facingMode: "user",
  //         width: { ideal: 1280 },
  //         height: { ideal: 720 },
  //       },
  //     });

  //     // Check if component is still mounted
  //     if (!isMountedRef.current) {
  //       // Clean up if component unmounted during async operation
  //       stream.getTracks().forEach((track) => track.stop());
  //       return;
  //     }

  //     setCameraStream(stream);

  //     // Set the stream to the video element
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;

  //       // Set up event listeners before calling play()
  //       videoRef.current.onloadedmetadata = () => {
  //         if (!isMountedRef.current || !videoRef.current) return;

  //         // Try playing the video after metadata is loaded
  //         const playPromise = videoRef.current.play();

  //         if (playPromise !== undefined) {
  //           playPromise
  //             .then(() => {
  //               if (isMountedRef.current) {
  //                 setIsReady(true);
  //               }
  //             })
  //             .catch((err) => {
  //               if (isMountedRef.current) {
  //                 console.error("Error playing video:", err);
  //                 setError(`Failed to play video: ${err.message}`);
  //               }
  //             });
  //         }
  //       };
  //     }
  //   } catch (err) {
  //     if (isMountedRef.current) {
  //       console.error("Camera access error:", err);
  //       setError(`Camera access failed: ${(err as Error).message}`);
  //     }
  //   }
  // }

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

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const context = canvas.getContext("2d");
      if (!context) {
        setError("Could not get canvas context");
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            setError("Failed to create image blob");
            return;
          }

          const capturedFile = new File([blob], "captured-image.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          // ✅ STOP the camera stream
          if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
          }

          // ✅ Clear video stream
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }

          // ✅ Notify parent and close camera UI
          onCapture(capturedFile, imageDataUrl);
          onClose(); // 👈 This ensures UI closes
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
    <div className="backdrop-blur-xl bg-blue-500/10 border border-blue-300/20 rounded-2xl p-8 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-50/90 tracking-tight">
          Camera
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handleCapture}
            disabled={!isReady}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 backdrop-blur-sm border ${
              isReady
                ? "bg-gradient-to-r from-blue-500/80 to-purple-600/80 border-blue-300/30 text-blue-50 hover:from-blue-600/90 hover:to-purple-700/90 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                : "bg-blue-400/10 border-blue-300/20 text-blue-300/60 cursor-not-allowed"
            }`}
          >
            {isReady ? "Capture" : "Initializing..."}
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-red-500/80 to-pink-500/80 border border-blue-300/30 text-blue-50 hover:from-red-600/90 hover:to-pink-600/90 hover:scale-105 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-red-500/25"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 backdrop-blur-sm bg-red-500/20 border border-red-400/30 text-red-100 px-5 py-4 rounded-xl text-sm shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            {error}
          </div>
        </div>
      )}

      {/* Camera View */}
      <div className="overflow-hidden rounded-2xl border border-blue-300/20 backdrop-blur-sm bg-blue-400/5 shadow-inner">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-h-[500px] object-contain rounded-2xl"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Loading Indicator */}
      {!isReady && !error && (
        <div className="mt-6 text-center text-blue-200/80 text-sm flex justify-center items-center gap-3">
          <div className="relative">
            <div className="w-5 h-5 border-2 border-blue-300/30 rounded-full"></div>
            <div className="absolute top-0 left-0 w-5 h-5 border-2 border-t-blue-200/90 border-r-blue-200/90 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <span className="font-medium">Initializing camera...</span>
        </div>
      )}
    </div>
  );
}

export default CameraComponent;
