"use client";

import { useState } from "react";
import { MovieSection } from "../components/MovieSection";
import { useSearch } from "../lib/movies";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useSearch(query);

  return (
    <div className="flex flex-col gap-8">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movie"
        autoFocus
        className="h-16 w-full max-w-sm bg-zinc-200/80 px-5 text-lg font-semibold placeholder:text-black"
      />
      {query.trim() && <MovieSection title="Results" movies={results} />}
    </div>
  );
}
