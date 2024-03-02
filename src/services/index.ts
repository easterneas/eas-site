import { PUBLIC_API_URL } from "@/constants/env";
import { endpointParser } from "@/utils/parsers/endpointParser";

// https://<YOUR_DOMAIN>/api/<YOUR_CT>
export const apiUrl = `${PUBLIC_API_URL}/api`;

console.warn({ PUBLIC_API_URL, apiUrl });

const serviceUrls = {
  dynamicPath: (endpoint: string) => `${apiUrl}/${endpoint}`,

  contactPath: (endpoint?: string) => endpointParser("contacts", endpoint),
  postPath: (endpoint?: string) => endpointParser("posts", endpoint),
  portfolioPath: (endpoint?: string) => endpointParser("portfolios", endpoint),
};

export default serviceUrls;
