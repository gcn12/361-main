"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { Movie } from "./movies";

type List = "saved" | "hidden";

export function writeMovies(list: List, movies: Movie[]) {
  localStorage.setItem(list, JSON.stringify(movies));
  window.dispatchEvent(new StorageEvent("storage"));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function useMovies(list: List): Movie[] {
  const localStorageValue = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(list) ?? "[]",
    () => "[]",
  );
  return useMemo(() => JSON.parse(localStorageValue), [localStorageValue]);
}
