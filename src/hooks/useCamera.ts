"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCameraOptions {
  autoStart?: boolean;
}

export function useCamera({ autoStart = true }: UseCameraOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsReady(false);
  }, []);

  const startCamera = useCallback(async () => {
    setError(null);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera access is not supported in this browser.");
      }

      stopCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsReady(true);
      }
    } catch (cameraError) {
      const message =
        cameraError instanceof DOMException && cameraError.name === "NotAllowedError"
          ? "Camera permission was denied. Please allow camera access to scan objects."
          : cameraError instanceof Error
            ? cameraError.message
            : "Unable to access the camera.";

      setError(message);
      setIsReady(false);
    }
  }, [stopCamera]);

  useEffect(() => {
    if (!autoStart) return undefined;

    let cancelled = false;

    async function initCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Camera access is not supported in this browser.");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
          setIsReady(true);
        }
      } catch (cameraError) {
        if (cancelled) return;

        const message =
          cameraError instanceof DOMException &&
          cameraError.name === "NotAllowedError"
            ? "Camera permission was denied. Please allow camera access to scan objects."
            : cameraError instanceof Error
              ? cameraError.message
              : "Unable to access the camera.";

        setError(message);
        setIsReady(false);
      }
    }

    void initCamera();

    const video = videoRef.current;

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (video) {
        video.srcObject = null;
      }
    };
  }, [autoStart]);

  return {
    videoRef,
    isReady,
    error,
    startCamera,
    stopCamera,
  };
}
