"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useMovies, writeMovies } from "@/app/lib/storage";
import type { Movie } from "@/app/lib/movies";

export function MovieCard({ movie }: { movie: Movie }) {
  const savedMovies = useMovies("saved");
  const saved = savedMovies.some((m) => m.id === movie.id);

  function onToggle() {
    writeMovies(
      "saved",
      saved
        ? savedMovies.filter((m) => m.id !== movie.id)
        : [movie, ...savedMovies],
    );
    toast(`${movie.title} ${saved ? "removed from" : "added to"} saved movies`);
  }

  return (
    <li className="flex flex-col gap-3">
      <div className="relative aspect-2/3 bg-zinc-200">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
            alt={movie.title}
            fill
            unoptimized
            className="object-cover"
          />
        )}
        <button
          type="button"
          onClick={onToggle}
          aria-label={saved ? "Unsave" : "Save"}
          className="cursor-pointer absolute top-2 right-2 flex size-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M6 3h12v18l-6-4-6 4z" />
          </svg>
        </button>
      </div>
      <span className="text-lg leading-tight">{movie.title}</span>
    </li>
  );
}
