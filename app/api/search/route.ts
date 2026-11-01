import { tmdb } from "@/app/lib/tmdb";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  return Response.json(await tmdb("/search/movie", { query }));
}
