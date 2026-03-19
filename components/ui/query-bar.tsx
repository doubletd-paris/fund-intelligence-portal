"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { quickQueries } from "@/data/mock-data";
import { useDemo } from "@/components/providers/demo-provider";
import { Button, Card } from "@/components/ui/primitives";

export function QueryBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const { addQuery, recentQueries } = useDemo();
  const [query, setQuery] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    addQuery(value);
    router.push(`/query?q=${encodeURIComponent(value)}`);
  };

  return (
    <Card className={compact ? "p-2" : "p-4"}>
      <form className="flex flex-col gap-3" onSubmit={submit}>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm text-ink outline-none"
            placeholder="Ask the portal: show logistics assets in Germany with vacancy above 10%"
          />
          <Button type="submit" className="shrink-0">
            Query
          </Button>
        </div>
        {!compact ? (
          <div className="flex flex-wrap gap-2">
            {(recentQueries.length ? recentQueries : quickQueries).slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setQuery(prompt);
                }}
                className="rounded-full border border-line bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:border-accent hover:text-accent"
              >
                {prompt}
              </button>
            ))}
          </div>
        ) : null}
      </form>
    </Card>
  );
}
