"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AlternativesCardProps {
  alternative: string;
  itemName: string;
}

export default function AlternativesCard({
  alternative,
  itemName,
}: AlternativesCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-[1.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-white p-6 sm:p-8 shadow-lg shadow-primary/5"
      aria-label={`Eco-friendly alternative for ${itemName}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
          <Sparkles className="h-5 w-5 text-primary-dark" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-primary-dark">Eco-Friendly Alternative</h3>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-600">
          Instead of <span className="font-semibold text-slate-900">{itemName}</span>, consider:
        </p>
        <p className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-primary-dark">{alternative}</p>
      </div>
    </motion.article>
  );
}
