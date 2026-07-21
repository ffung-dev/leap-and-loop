import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-green-600 text-white hover:bg-green-700 shadow-sm shadow-green-900/10",
  secondary: "bg-white text-brown-800 ring-1 ring-tan-300 hover:bg-tan-50",
  pink: "bg-pink-400 text-white hover:bg-pink-500 shadow-sm shadow-pink-900/10",
  ghost: "text-brown-700 hover:bg-tan-100",
} as const;

const SIZES = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
} as const;

type BaseProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  className?: string;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className"
  >;

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {props.children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {props.children}
    </button>
  );
}
