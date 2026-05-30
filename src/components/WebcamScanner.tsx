"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, Loader2, Scan } from "lucide-react";
import {
  CLASSIFICATION_INTERVAL_MS,
  CONFIDENCE_THRESHOLD,
  STABLE_DETECTION_COUNT,
} from "@/lib/constants";
import { getClassifier, initClassifier } from "@/lib/classifier";
import { useCamera } from "@/hooks/useCamera";
import type { DetectionResult } from "@/types/sustainability";

interface WebcamScannerProps {
  onStableDetection: (result: DetectionResult) => void;
}

export default function WebcamScanner({ onStableDetection }: WebcamScannerProps) {
  const { videoRef, isReady, error, startCamera } = useCamera();
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [currentDetection, setCurrentDetection] = useState<DetectionResult | null>(
    null,
  );
  const [scanStatus, setScanStatus] = useState("Initializing scanner...");
  const stableCountRef = useRef(0);
  const lastClassRef = useRef<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function loadClassifier() {
      try {
        await initClassifier();
        if (mounted) {
          setModelLoading(false);
          setScanStatus("Point your camera at an object to scan");
        }
      } catch {
        if (mounted) {
          setModelError("AI model unavailable. Using demo classifier.");
          setModelLoading(false);
          setScanStatus("Demo mode — point camera at an object");
        }
      }
    }

    void loadClassifier();
    return () => {
      mounted = false;
    };
  }, []);

  const runClassification = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isReady || modelLoading || isProcessingRef.current) return;

    isProcessingRef.current = true;

    try {
      const classifier = getClassifier();
      const result = await classifier.classifyFrame(video);

      if (!result || result.confidence < CONFIDENCE_THRESHOLD) {
        stableCountRef.current = 0;
        lastClassRef.current = null;
        setCurrentDetection(null);
        setScanStatus("Scanning... hold object steady");
        return;
      }

      setCurrentDetection(result);

      if (result.class === lastClassRef.current) {
        stableCountRef.current += 1;
      } else {
        lastClassRef.current = result.class;
        stableCountRef.current = 1;
      }

      const confidencePercent = Math.round(result.confidence * 100);

      if (stableCountRef.current >= STABLE_DETECTION_COUNT) {
        setScanStatus(`Detected ${result.class} — loading results...`);
        onStableDetection(result);
        stableCountRef.current = 0;
        lastClassRef.current = null;
        return;
      }

      setScanStatus(
        `Detecting ${result.class} (${confidencePercent}%) — hold steady`,
      );
    } finally {
      isProcessingRef.current = false;
    }
  }, [videoRef, isReady, modelLoading, onStableDetection]);

  useEffect(() => {
    if (!isReady || modelLoading) return;

    const interval = setInterval(() => {
      void runClassification();
    }, CLASSIFICATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isReady, modelLoading, runClassification]);

  const handleManualCapture = () => {
    if (currentDetection) {
      onStableDetection(currentDetection);
    }
  };

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <Camera className="mx-auto h-10 w-10 text-red-500" aria-hidden="true" />
        <p className="mt-4 font-medium text-red-800">{error}</p>
        <button
          type="button"
          onClick={() => void startCamera()}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Retry Camera Access
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-black shadow-2xl shadow-black/20 ring-1 ring-white/10 ring-inset">
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover sm:aspect-[4/3]"
          playsInline
          muted
          aria-label="Live camera feed for object scanning"
        />

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-56 w-56 sm:h-72 sm:w-72 rounded-[2rem] border-2 border-dashed border-primary/80 shadow-[0_0_40px_rgba(34,197,94,0.2)]" />
        </div>

        {(modelLoading || !isReady) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white backdrop-blur-sm transition-all">
            <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
            <p className="mt-4 text-sm font-medium tracking-wide">
              {modelLoading ? "Loading AI model..." : "Starting camera..."}
            </p>
          </div>
        )}
      </div>

      <div
        className="rounded-[1.5rem] border border-black/5 bg-white p-5 sm:p-6 shadow-lg shadow-black/[0.03]"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Scan className="h-5 w-5 text-primary-dark" aria-hidden="true" />
          </div>
          <p className="text-base font-semibold text-slate-800">{scanStatus}</p>
        </div>

        {modelError && (
          <p className="mt-3 text-sm font-medium text-amber-700 bg-amber-50 rounded-xl p-3 border border-amber-100">{modelError}</p>
        )}

        {currentDetection && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Detected Object</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{currentDetection.class}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Confidence</p>
                <p className="mt-1 text-lg font-bold text-primary-dark">
                  {Math.round(currentDetection.confidence * 100)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <button
        type="button"
        onClick={handleManualCapture}
        disabled={!currentDetection || modelLoading}
        className="w-full rounded-2xl bg-primary px-4 py-4 text-lg font-bold tracking-wide text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:bg-primary-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
        aria-label="Capture current detection manually"
      >
        Capture Now
      </button>
    </div>
  );
}
