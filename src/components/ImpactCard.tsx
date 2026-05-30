"use client";

import { motion } from "framer-motion";
import { Clock, Cloud } from "lucide-react";

interface ImpactCardProps {
  decompositionTime: string;
  co2Impact: string;
}

export default function ImpactCard({
  decompositionTime,
  co2Impact,
}: ImpactCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-[1.5rem] border border-black/5 bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.03]"
      aria-label="Environmental impact"
    >
      <h3 className="text-xl font-bold tracking-tight text-foreground">Environmental Impact</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
            <Clock className="h-5 w-5 text-blue-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">Decomposition Time</p>
            <p className="mt-1 text-lg font-bold text-slate-800">{decompositionTime}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-5 border border-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
            <Cloud className="h-5 w-5 text-orange-600" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted">CO₂ Impact</p>
            <p className="mt-1 text-lg font-bold text-slate-800">{co2Impact}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
