import { Suspense } from "react";
import { MovieSection, SavedSection } from "./components/MovieSection";
import { tmdb } from "./lib/tmdb";

async function NewReleases() {
  const movies = await tmdb("/movie/now_playing");
  return <MovieSection title="New releases" href="/new-releases" movies={movies} limit={5} />;
}

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <Suspense fallback={<MovieSection title="New releases" movies={undefined} />}>
        <NewReleases />
      </Suspense>
      <SavedSection href="/saved" limit={5} />
    </div>
  );
}
