import { Heart } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="gradient-hero flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <Heart className="text-pink-400" size={40} aria-hidden />
      <h1 className="mt-4 font-title text-4xl text-brown-900">Page not found</h1>
      <p className="mt-3 max-w-md text-brown-600">
        We couldn&apos;t find the page you were looking for. Let&apos;s get you back on track.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
    </div>
  );
}
