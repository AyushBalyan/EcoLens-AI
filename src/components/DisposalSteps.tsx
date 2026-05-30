"use client";

import { motion } from "framer-motion";
import { ListChecks } from "lucide-react";

interface DisposalStepsProps {
  steps: string[];
  itemName: string;
}

export default function DisposalSteps({ steps, itemName }: DisposalStepsProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-[1.5rem] border border-black/5 bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.03]"
      aria-label={`Disposal guidance for ${itemName}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <ListChecks className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold tracking-tight">Disposal Guidance</h3>
      </div>

      <ol className="mt-6 space-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-4 text-base leading-relaxed text-slate-700">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary-dark"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </motion.article>
  );
}
