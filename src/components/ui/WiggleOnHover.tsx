"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function WiggleOnHover({
  children,
  as = "span",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "span";
  className?: string;
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      whileHover={{
        rotate: [0, -2.5, 2.5, -2, 2, 0],
        scale: 1.02,
        transition: { duration: 0.6, ease: "easeInOut" },
      }}
      style={{ display: "inline-block", transformOrigin: "center" }}
    >
      {children}
    </MotionTag>
  );
}
