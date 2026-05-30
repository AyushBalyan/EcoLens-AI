import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-500 uppercase">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Leaf className="h-4 w-4 text-primary-dark" aria-hidden="true" />
          </div>
          <span>Scan Today, Sustain Tomorrow</span>
        </div>
        <div className="flex gap-6 text-sm font-bold text-slate-500">
          <Link href="/scanner" className="hover:text-primary transition-colors">
            Start Scanning
          </Link>
          <Link href="/learn" className="hover:text-primary transition-colors">
            Learn Sustainability
          </Link>
        </div>
        <p className="text-xs font-medium text-slate-400">
          © Arush Balyan
        </p>
      </div>
    </footer>
  );
}
