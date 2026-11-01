import { Suspense } from "react";
import { MovieSection } from "../components/MovieSection";
import { tmdb } from "../lib/tmdb";

async function NewReleases() {
  const movies = await tmdb("/movie/now_playing");
  return <MovieSection title="New releases" movies={movies} />;
}

export default function NewReleasesPage() {
  return (
    <Suspense fallback={<MovieSection title="New releases" movies={undefined} />}>
      <NewReleases />
    </Suspense>
  );
}
