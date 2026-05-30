"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Recycle, Scan, Sparkles } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Live Camera Scanner",
    description:
      "Point your webcam at everyday items and get instant AI-powered identification.",
  },
  {
    icon: Recycle,
    title: "Disposal Guidance",
    description:
      "Learn exactly how to dispose of each item responsibly with step-by-step instructions.",
  },
  {
    icon: Sparkles,
    title: "Eco Alternatives",
    description:
      "Discover sustainable replacements that reduce waste and environmental impact.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-20 overflow-hidden">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center pb-12 sm:pb-20"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 shadow-inner">
          <Leaf className="h-8 w-8 text-primary-dark" aria-hidden="true" />
        </div>

        <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Scan Today, <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-primary-dark to-accent bg-clip-text text-transparent">
            Sustain Tomorrow
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl leading-relaxed">
          EcoLens AI uses real-time computer vision to identify waste objects,
          explain their environmental impact, and guide you toward sustainable
          choices.
        </p>

        <Link
          href="/scanner"
          className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary-dark hover:shadow-primary/40 active:scale-95"
        >
          Start Scanning
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative mt-8 sm:mt-12 rounded-[2rem] border border-black/5 bg-white/70 backdrop-blur-xl p-8 sm:p-14 shadow-xl shadow-black/5"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-[2rem] pointer-events-none" />
        <div className="relative">
          <h2 className="text-2xl font-bold sm:text-4xl tracking-tight">Our Mission</h2>
          <p className="mt-6 max-w-3xl text-muted text-base sm:text-lg leading-relaxed">
            Most people don&apos;t know whether an item is recyclable, how to
            dispose of it correctly, or what sustainable alternatives exist.
            Improper waste disposal contributes to pollution, landfill growth, and
            resource wastage. EcoLens AI makes sustainability education instant,
            interactive, and accessible to everyone.
          </p>
        </div>
      </motion.section>

      <section className="mt-8 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group rounded-[1.5rem] border border-black/5 bg-white p-6 sm:p-8 shadow-lg shadow-black/[0.03] transition-all hover:shadow-xl hover:shadow-primary/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
              <feature.icon
                className="h-6 w-6 text-primary-dark"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{feature.title}</h3>
            <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
              {feature.description}
            </p>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
