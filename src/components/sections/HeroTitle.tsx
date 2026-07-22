"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

// Reference size used only to measure the text's natural width ratio — not what's displayed.
const MEASURE_FONT_SIZE = 160;
const MIN_FONT_SIZE = 28;
const MAX_FONT_SIZE = 180;
// SSR-safe first paint guess, refined immediately on mount before the browser paints.
const INITIAL_FONT_SIZE = 56;

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

export function HeroTitle({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState(INITIAL_FONT_SIZE);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    function recalc() {
      const containerWidth = container!.clientWidth;
      const textWidth = measure!.scrollWidth;
      if (!textWidth || !containerWidth) return;
      const next = (containerWidth / textWidth) * MEASURE_FONT_SIZE;
      setFontSize(Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, next)));
    }

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(container);
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Invisible reference node, always measured at a fixed size so the width ratio is stable. */}
      <span
        ref={measureRef}
        aria-hidden
        className={className}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontSize: MEASURE_FONT_SIZE,
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
      <motion.h1
        className={className}
        style={{ fontSize, whiteSpace: "nowrap", display: "inline-block", transformOrigin: "center" }}
        whileHover={{
          rotate: [0, -2.5, 2.5, -2, 2, 0],
          scale: 1.02,
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
