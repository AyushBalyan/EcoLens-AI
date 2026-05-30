"use client";

import { motion } from "framer-motion";
import { Cell, Pie, PieChart } from "recharts";
import { getEcoScoreRating } from "@/lib/sustainability";

interface EcoScoreGaugeProps {
  score: number;
}

const CHART_WIDTH = 288;
const CHART_HEIGHT = 192;

function getScoreColor(score: number): string {
  if (score <= 3) return "#ef4444";
  if (score <= 6) return "#f59e0b";
  if (score <= 8) return "#22c55e";
  return "#15803d";
}

export default function EcoScoreGauge({ score }: EcoScoreGaugeProps) {
  const rating = getEcoScoreRating(score);
  const color = getScoreColor(score);
  const data = [
    { name: "score", value: score },
    { name: "remaining", value: 10 - score },
  ];

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="rounded-[1.5rem] border border-black/5 bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.03]"
      aria-label={`Eco score gauge: ${score} out of 10, rated ${rating}`}
    >
      <h3 className="text-center text-xl font-bold tracking-tight">Eco Score</h3>

      <div
        className="relative mx-auto mt-6 flex justify-center"
        style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}
      >
        <PieChart width={CHART_WIDTH} height={CHART_HEIGHT}>
          <Pie
            data={data}
            cx={CHART_WIDTH / 2}
            cy={CHART_HEIGHT / 2 + 16}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
            cornerRadius={4}
          >
            <Cell fill={color} />
            <Cell fill="#f1f5f9" />
          </Pie>
        </PieChart>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-baseline"
          >
            <span className="text-5xl font-extrabold tracking-tight text-foreground">
              {score}
            </span>
            <span className="ml-1 text-lg font-medium text-slate-400">/ 10</span>
          </motion.div>
          <span
            className="mt-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            {rating}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
