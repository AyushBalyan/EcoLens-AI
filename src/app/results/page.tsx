"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Scan } from "lucide-react";
import AlternativesCard from "@/components/AlternativesCard";
import DetectionCard from "@/components/DetectionCard";
import DisposalSteps from "@/components/DisposalSteps";
import EcoScoreGauge from "@/components/EcoScoreGauge";
import ImpactCard from "@/components/ImpactCard";
import SustainabilityCard from "@/components/SustainabilityCard";
import { clearDetection, getDetection } from "@/lib/detectionStorage";
import { getSustainabilityInfo } from "@/lib/sustainability";
import type { StoredDetection, SustainabilityInfo } from "@/types/sustainability";

type ResultsData =
  | { status: "loading" }
  | { status: "redirect" }
  | { status: "ready"; detection: StoredDetection; info: SustainabilityInfo | null };

function loadResultsData(): ResultsData {
  const stored = getDetection();
  if (!stored) return { status: "redirect" };

  clearDetection();
  return {
    status: "ready",
    detection: stored,
    info: getSustainabilityInfo(stored.class),
  };
}

export default function ResultsPage() {
  const router = useRouter();
  const [data] = useState<ResultsData>(loadResultsData);

  useEffect(() => {
    if (data.status === "redirect") {
      router.replace("/scanner");
    }
  }, [data, router]);

  if (data.status === "loading" || data.status === "redirect") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-muted">
        Loading results...
      </div>
    );
  }

  const { detection, info } = data;

  if (!info) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Unknown Object</h1>
        <p className="mt-4 text-muted">
          We detected &quot;{detection.class}&quot; but don&apos;t have
          sustainability data for it yet.
        </p>
        <Link
          href="/scanner"
          className="mt-6 inline-flex items-center gap-2 text-primary-dark hover:underline"
        >
          <Scan className="h-4 w-4" aria-hidden="true" />
          Scan Again
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <Link
            href="/scanner"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-muted hover:text-primary-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            BACK TO SCANNER
          </Link>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">Sustainability Dashboard</h1>
          <p className="mt-3 text-lg text-muted max-w-2xl">
            Here&apos;s what we know about your scanned item and how to dispose of
            it sustainably.
          </p>
        </div>

        <div className="hidden sm:flex shrink-0 gap-3">
          <Link
            href="/scanner"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-primary-dark active:scale-95"
          >
            <Scan className="h-5 w-5" aria-hidden="true" />
            Scan Another
          </Link>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2">
        <DetectionCard detection={detection} />
        <EcoScoreGauge score={info.ecoScore} />
        <SustainabilityCard info={info} />
        <ImpactCard
          decompositionTime={info.decompositionTime}
          co2Impact={info.co2Impact}
        />
        <AlternativesCard alternative={info.alternative} itemName={info.name} />
        <DisposalSteps steps={info.disposalSteps} itemName={info.name} />
      </div>

      <div className="mt-10 flex flex-col sm:hidden gap-4">
        <Link
          href="/scanner"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-lg font-bold text-white shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          <Scan className="h-5 w-5" aria-hidden="true" />
          Scan Another
        </Link>
        <Link
          href="/learn"
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-black/5 bg-white px-6 text-lg font-bold text-slate-700 shadow-sm active:scale-95 transition-transform"
        >
          <BookOpen className="h-5 w-5" aria-hidden="true" />
          Learn More
        </Link>
      </div>
    </div>
  );
}
