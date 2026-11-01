import "server-only";

export async function tmdb(path: string, params: Record<string, string> = {}) {
  const res = await fetch(
    `https://api.themoviedb.org/3${path}?${new URLSearchParams(params)}`,
    { headers: { Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}` } },
  );
  if (!res.ok) throw new Error(`TMDb request failed: ${res.status}`);
  const { results } = await res.json();
  return results;
}
