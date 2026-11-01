"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSearch, type Movie } from "../lib/movies";
import { useMovies, writeMovies } from "../lib/storage";

function label(movie: Movie) {
  return `${movie.title} (${movie.release_date.slice(0, 4)})`;
}

export default function SettingsPage() {
  const hidden = useMovies("hidden");
  const [query, setQuery] = useState("");
  const matches = useSearch(query);

  function hide(movie: Movie) {
    writeMovies("hidden", [...hidden, movie]);
    toast(`${movie.title} added to hidden movies list`);
    setQuery("");
  }

  function unhide(movie: Movie) {
    writeMovies(
      "hidden",
      hidden.filter((m) => m.id !== movie.id),
    );
    toast(`${movie.title} removed from hidden movies list`);
  }

  return (
    <section className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-lg font-semibold">Hide movies</h1>
      <p className="mb-6 text-lg leading-snug">
        Have a movie you never want to watch? Select movies you wish to omit
        from your recommendations. Doing so will hide the movie from all lists,
        emails, etc. Movies can be removed at any time.
      </p>
      <ul className="flex flex-wrap gap-5">
        {hidden.map((movie) => (
          <li
            key={movie.id}
            className="flex items-center gap-3 rounded-full bg-sky-200/70 px-4 py-2 text-lg"
          >
            {label(movie)}
            <button
              type="button"
              aria-label="Unhide"
              onClick={() => unhide(movie)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-10">
        <div className="relative w-full max-w-sm">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movie"
            className="h-16 w-full bg-zinc-200/80 px-5 text-lg font-semibold placeholder:text-black"
          />
          {query.trim() && matches && matches.length > 0 && (
            <ul className="absolute inset-x-0 top-full z-10 mt-1 border border-zinc-200 bg-white shadow-lg">
              {matches.slice(0, 6).map((movie) => (
                <li key={movie.id}>
                  <button
                    type="button"
                    onClick={() => hide(movie)}
                    className="w-full px-5 py-3 text-left hover:bg-zinc-100"
                  >
                    {label(movie)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
