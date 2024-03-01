import { apiUrl } from "@/services";

export const endpointParser = (baseUrl: string, endpoint?: string) => {
  const returningUrl = `${apiUrl}/${baseUrl}`;

  if (!endpoint) return returningUrl;

  if (endpoint.startsWith("?")) return `${returningUrl}${endpoint}`;

  return `${returningUrl}/${endpoint}`;
};
