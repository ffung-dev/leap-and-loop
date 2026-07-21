import type { SVGProps } from "react";

import type { SocialPlatform } from "@/types/sanity";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M13.8 21v-6.8h2.2l.4-2.6h-2.6V9.9c0-.8.3-1.4 1.5-1.4h1.2V6.2c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v1.9H9v2.6h2.3V21" />
    </svg>
  );
}

function TikTokIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 3v10.7a2.7 2.7 0 1 1-2.2-2.66" />
      <path d="M13.5 3c.4 2.2 2 3.8 4.2 4.1" />
    </svg>
  );
}

function PinterestIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 18c.6-2 1.2-4.4 1.9-7.2a2.5 2.5 0 1 1 4.9-1c0 2-1.2 3.9-2.9 3.9-.8 0-1.4-.6-1.2-1.5" />
      <path d="M11.4 10.8c-.4 1.7-1 4-1.7 6.4" />
    </svg>
  );
}

function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.7 14.8 12l-4.3 2.3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EtsyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 7.5h5.2M9.5 7.5v9M9.5 11.7h4M9.5 16.5h5.4" />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.6 5.6 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.6-3.6-9s1.2-6.5 3.6-9Z" />
    </svg>
  );
}

export const SOCIAL_ICON_MAP: Record<SocialPlatform, (props: IconProps) => React.JSX.Element> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  pinterest: PinterestIcon,
  youtube: YoutubeIcon,
  etsy: EtsyIcon,
  email: MailIcon,
  other: GlobeIcon,
};

export function SocialIcon({
  platform,
  ...props
}: { platform: SocialPlatform } & IconProps) {
  const Icon = SOCIAL_ICON_MAP[platform] ?? GlobeIcon;
  return <Icon {...props} />;
}
