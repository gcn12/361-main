"use client";

import Link from "next/link";
import { useMovies } from "@/app/lib/storage";
import type { Movie } from "@/app/lib/movies";
import { MovieCard } from "./MovieCard";

export function MovieSection({
  title,
  movies,
  href,
  limit,
  empty = "Nothing here yet.",
}: {
  title: string;
  movies: Movie[] | undefined;
  href?: string;
  limit?: number;
  empty?: string;
}) {
  const hiddenIds = useMovies("hidden").map((m) => m.id);
  const visible = (movies ?? [])
    .filter((m) => !hiddenIds.includes(m.id))
    .slice(0, limit);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between text-lg font-medium">
        <h2 className="font-semibold">{title}</h2>
        {href && <Link href={href}>View all</Link>}
      </div>
      {!movies ? (
        <p>Loading…</p>
      ) : visible.length === 0 ? (
        <p className="text-zinc-500">{empty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-5">
          {visible.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}

export function SavedSection({
  href,
  limit,
}: {
  href?: string;
  limit?: number;
}) {
  return (
    <MovieSection
      empty="Nothing here yet. To save movies, click on the bookmark icon in the top right of a movie's poster."
      title="Saved movies"
      movies={useMovies("saved")}
      href={href}
      limit={limit}
    />
  );
}
