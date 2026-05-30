"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import WebcamScanner from "@/components/WebcamScanner";
import { saveDetection } from "@/lib/detectionStorage";
import type { DetectionResult } from "@/types/sustainability";

export default function ScannerPage() {
  const router = useRouter();

  const handleStableDetection = useCallback(
    (result: DetectionResult) => {
      saveDetection(result);
      router.push("/results");
    },
    [router],
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center sm:text-left"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Live Scanner</h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          Allow camera access, hold an object in the frame, and EcoLens AI will
          identify it and show sustainability insights.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mt-10"
      >
        <WebcamScanner onStableDetection={handleStableDetection} />
      </motion.div>
    </div>
  );
}
