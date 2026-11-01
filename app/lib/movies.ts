import { useEffect, useState } from "react";

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
};

export async function searchMovies(query: string): Promise<Movie[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }
  return res.json();
}

export function useSearch(query: string) {
  const [results, setResults] = useState<Movie[]>();
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      return;
    }
    let current = true;
    const timer = setTimeout(async () => {
      const movies = await searchMovies(q);
      if (current) {
        setResults(movies);
      }
    }, 250);
    return () => {
      current = false;
      clearTimeout(timer);
    };
  }, [query]);
  return results;
}
