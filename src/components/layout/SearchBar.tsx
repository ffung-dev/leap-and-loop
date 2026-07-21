"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type SearchResult = {
  id: string;
  title: string;
  href: string;
  kind: "Event" | "Location";
  meta?: string;
};

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();

  useEffect(() => {
    if (trimmedQuery.length < 2) return;

    // Flagging the debounced fetch's own loading indicator is a false positive:
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects shows this exact shape.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmedQuery)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [trimmedQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const showDropdown = open && trimmedQuery.length >= 2;
  const visibleResults = trimmedQuery.length >= 2 ? results : [];

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <label htmlFor="site-search" className="sr-only">
        Search events and locations
      </label>
      <div className="flex items-center gap-2 rounded-full border border-tan-200 bg-white/80 px-4 py-2 shadow-sm focus-within:border-green-400">
        <Search size={16} className="shrink-0 text-brown-400" aria-hidden />
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search events, locations…"
          className="w-full bg-transparent text-sm text-brown-800 placeholder:text-brown-400 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            aria-label="Clear search"
            className="shrink-0 text-brown-400 hover:text-brown-600"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-tan-200 bg-white p-2 shadow-lg">
          {loading && <p className="px-3 py-2 text-sm text-brown-400">Searching…</p>}
          {!loading && visibleResults.length === 0 && (
            <p className="px-3 py-2 text-sm text-brown-400">No results for &ldquo;{query}&rdquo;</p>
          )}
          {!loading &&
            visibleResults.map((result) => (
              <Link
                key={`${result.kind}-${result.id}`}
                href={result.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm hover:bg-tan-50"
              >
                <span className="text-brown-800">{result.title}</span>
                <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                  {result.kind}
                </span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
