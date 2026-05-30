"use client";

import { motion } from "framer-motion";
import { Recycle, Trash2 } from "lucide-react";
import type { SustainabilityInfo } from "@/types/sustainability";
import { getEcoScoreRating } from "@/lib/sustainability";

interface SustainabilityCardProps {
  info: SustainabilityInfo;
}

export default function SustainabilityCard({ info }: SustainabilityCardProps) {
  const rating = getEcoScoreRating(info.ecoScore);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-[1.5rem] border border-black/5 bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.03]"
      aria-label="Sustainability overview"
    >
      <h3 className="text-xl font-bold tracking-tight text-foreground">
        Sustainability Overview
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
          <p className="text-sm font-medium text-muted">Eco Score</p>
          <p className="mt-2 text-3xl font-extrabold text-primary-dark tracking-tight">
            {info.ecoScore}<span className="text-xl text-slate-400">/10</span>
          </p>
          <p className="mt-1 text-sm font-medium text-muted">{rating}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
          <p className="text-sm font-medium text-muted">Recyclable</p>
          <div className="mt-2 flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${info.recyclable ? 'bg-primary/10' : 'bg-red-500/10'}`}>
              {info.recyclable ? (
                <Recycle className="h-5 w-5 text-primary-dark" aria-hidden="true" />
              ) : (
                <Trash2 className="h-5 w-5 text-red-600" aria-hidden="true" />
              )}
            </div>
            <p className="text-2xl font-bold tracking-tight text-foreground">
              {info.recyclable ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/5 p-5 border border-primary/10">
        <p className="text-sm font-medium text-primary-dark/80">Disposal Method</p>
        <p className="mt-1 text-lg font-bold tracking-tight text-primary-dark">{info.binType}</p>
      </div>
    </motion.article>
  );
}
