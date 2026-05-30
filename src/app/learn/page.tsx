"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Factory,
  Heart,
  Recycle,
  Trash2,
} from "lucide-react";

const topics = [
  {
    id: "recycling",
    icon: Recycle,
    title: "Recycling Basics",
    content: [
      "Recycling converts waste materials into new products, reducing the need for raw resources.",
      "Always clean containers before recycling — food residue can contaminate entire batches.",
      "Check local guidelines: accepted materials vary by municipality.",
      "Remember the hierarchy: Reduce first, then Reuse, then Recycle.",
    ],
  },
  {
    id: "waste-management",
    icon: Trash2,
    title: "Waste Management Hierarchy",
    content: [
      "The waste hierarchy ranks strategies from most to least environmentally preferred.",
      "Prevention and reduction are at the top — avoid creating waste in the first place.",
      "Reuse and repair extend product lifecycles and keep materials in use.",
      "Recycling and composting come next, with landfill disposal as the last resort.",
    ],
  },
  {
    id: "pollution",
    icon: Factory,
    title: "Pollution & Environmental Impact",
    content: [
      "Improper waste disposal releases greenhouse gases, toxins, and microplastics into ecosystems.",
      "Plastic waste in oceans harms marine life and enters the food chain.",
      "Landfills produce methane, a greenhouse gas 25 times more potent than CO₂.",
      "Every item you dispose of correctly helps reduce pollution and protect biodiversity.",
    ],
  },
  {
    id: "sustainable-living",
    icon: Heart,
    title: "Sustainable Living Tips",
    content: [
      "Carry reusable bags, bottles, and containers to reduce single-use waste.",
      "Buy products with minimal packaging and choose durable goods over disposable ones.",
      "Compost food scraps to divert organic waste from landfills.",
      "Support brands committed to circular economy practices and ethical sourcing.",
    ],
  },
];

export default function LearnPage() {
  const [openId, setOpenId] = useState<string | null>(topics[0]?.id ?? null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center sm:text-left"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Learn Sustainability</h1>
        <p className="mt-4 text-lg text-muted max-w-2xl leading-relaxed">
          Explore key concepts in recycling, waste management, and sustainable
          living to make better environmental choices every day.
        </p>
      </motion.div>

      <div className="mt-10 space-y-5">
        {topics.map((topic, index) => {
          const isOpen = openId === topic.id;

          return (
            <motion.article
              key={topic.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className={`overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-sm transition-all ${
                isOpen ? "shadow-md shadow-black/5 ring-1 ring-primary/20" : "hover:shadow-md hover:border-black/10"
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-6 sm:p-8 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={isOpen}
                aria-controls={`panel-${topic.id}`}
                onClick={() => setOpenId(isOpen ? null : topic.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${isOpen ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-primary/10 text-primary-dark"}`}>
                    <topic.icon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">{topic.title}</h2>
                </div>
                <ChevronDown
                  className={`h-6 w-6 shrink-0 text-slate-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`panel-${topic.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ul className="space-y-4 border-t border-slate-100 bg-slate-50/50 px-6 pb-8 pt-6 sm:px-24">
                      {topic.content.map((paragraph) => (
                        <li
                          key={paragraph}
                          className="relative text-base leading-relaxed text-slate-600 before:absolute before:-left-6 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/40"
                        >
                          {paragraph}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
