"use client";

import { motion } from "framer-motion";
import { ScanLine } from "lucide-react";
import type { DetectionResult } from "@/types/sustainability";

interface DetectionCardProps {
  detection: DetectionResult;
}

export default function DetectionCard({ detection }: DetectionCardProps) {
  const confidencePercent = Math.round(detection.confidence * 100);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[1.5rem] border border-black/5 bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.03]"
      aria-label="Detection results"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 shadow-inner">
          <ScanLine className="h-7 w-7 text-primary-dark" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium tracking-wide text-muted uppercase">Detected Object</p>
          <h2 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {detection.class}
          </h2>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary-dark">
            Confidence: {confidencePercent}%
          </div>
        </div>
      </div>
    </motion.article>
  );
}
