export function internalHeaders(extra?: Record<string, string>): HeadersInit {
  return {
    "Content-Type": "application/json",
    "x-storyseeker-token": process.env.NEXT_PUBLIC_API_TOKEN ?? "",
    ...extra,
  };
}
