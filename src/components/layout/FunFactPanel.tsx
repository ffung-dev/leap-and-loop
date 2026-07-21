"use client";

import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Sparkles } from "lucide-react";
import { useState } from "react";

import { SocialIcon } from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";
import type { FunFact, SocialLink } from "@/types/sanity";

type FunFactPanelProps = {
  intro?: string;
  funFacts?: FunFact[];
  socialLinks?: SocialLink[];
};

function FactList({ funFacts }: { funFacts: FunFact[] }) {
  return (
    <ul className="space-y-4">
      {funFacts.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-snug text-white/90">
          <span aria-hidden className="text-base leading-none">
            {item.emoji || "🧶"}
          </span>
          <span>{item.fact}</span>
        </li>
      ))}
    </ul>
  );
}

function SocialRow({ socialLinks }: { socialLinks: SocialLink[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {socialLinks.map((link) => (
        <a
          key={`${link.platform}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label || link.platform}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          <SocialIcon platform={link.platform} className="h-4.5 w-4.5" />
        </a>
      ))}
    </div>
  );
}

export function FunFactPanel({ intro, funFacts, socialLinks }: FunFactPanelProps) {
  const [open, setOpen] = useState(true);

  const hasFacts = Boolean(funFacts && funFacts.length > 0);
  const hasSocial = Boolean(socialLinks && socialLinks.length > 0);
  if (!hasFacts && !hasSocial) return null;

  const heading = intro || "Fun facts about us";

  return (
    <>
      {/* Mobile: collapsible bar under the navbar */}
      <div className="gradient-panel border-b border-white/10 text-white lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-5 py-3"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles size={16} aria-hidden />
            {heading}
          </span>
          {open ? <ChevronUp size={18} aria-hidden /> : <ChevronDown size={18} aria-hidden />}
        </button>
        <div
          inert={!open}
          className={cn(
            "overflow-hidden px-5 transition-[max-height,opacity] duration-300 ease-out",
            open ? "max-h-[28rem] pb-5 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {hasFacts && <FactList funFacts={funFacts!} />}
          {hasSocial && (
            <div className="mt-5">
              <SocialRow socialLinks={socialLinks!} />
            </div>
          )}
        </div>
      </div>

      {/* Desktop: collapsible sidebar */}
      <aside
        className={cn(
          "gradient-panel relative hidden shrink-0 overflow-hidden border-r border-white/10 text-white transition-[width] duration-300 ease-out lg:flex lg:flex-col",
          open ? "w-72" : "w-14"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Hide fun facts panel" : "Show fun facts panel"}
          className="absolute right-2 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
        >
          {open ? <ChevronLeft size={16} aria-hidden /> : <ChevronRight size={16} aria-hidden />}
        </button>

        <div inert={!open} className="w-72 shrink-0 px-5 pb-6 pt-16">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/70">
            <Sparkles size={14} aria-hidden />
            {heading}
          </p>
          {hasFacts && <FactList funFacts={funFacts!} />}
          {hasSocial && (
            <div className="mt-6 border-t border-white/15 pt-5">
              <SocialRow socialLinks={socialLinks!} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
