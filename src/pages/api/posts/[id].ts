import type { APIRoute } from "node_modules/astro/dist/types/public";

export const GET: APIRoute = async ({params, request, url}) => {
  const qs = Object.fromEntries(url.searchParams.entries())
  return new Response(
    JSON.stringify({params, url: request.url, paramObject: qs})
  )
}
