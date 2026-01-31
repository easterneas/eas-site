/// <reference types="astro/client" />
/// <reference types="./src/env.d.ts" />

import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import { defineConfig, envField, passthroughImageService } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import cloudflare from "@astrojs/cloudflare";
import { loadEnv } from "vite";

import { resolve } from "node:path";

const {
  ALLOWED_HOSTS,
  API_TOKEN,
  PUBLIC_SITE_URL,
  PUBLIC_SITE_NAME,
  PUBLIC_API_URL
} = loadEnv(
  `${process.env.NODE_ENV}`,
  process.cwd(),
  ""
);

const allowedHosts = ALLOWED_HOSTS ? JSON.parse(ALLOWED_HOSTS) : [PUBLIC_SITE_URL]

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: "passthrough",
    platformProxy: {
      enabled: true,
    },
  }),
  image: {
    service: passthroughImageService(),
  },
  compressHTML: false,
  env: {
    schema: {
      API_TOKEN: envField.string({ context: "server", access: "secret", default: API_TOKEN }),
      PUBLIC_API_URL: envField.string({
        context: "client",
        access: "public",
        default: PUBLIC_API_URL,
      }),
      PUBLIC_SITE_NAME: envField.string({
        context: "client",
        access: "public",
        default: PUBLIC_SITE_NAME,
      }),
      PUBLIC_SITE_URL: envField.string({
        context: "client",
        access: "public",
        default: PUBLIC_SITE_URL,
      }),
    },
  },
  // compressHTML: process.env.NODE_ENV === "production",
  // site: process.env.PUBLIC_SITE_URL,
  output: "server",
  vite: {
    plugins: [yaml()],
    ssr: {
      external: ["node:buffer", "rollup"],
    },
    // build: {
    //   outDir: "dist",
    // },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve("./src"),
        },
      ],
    },
    server: {
      allowedHosts
    }
  },
  integrations: [
    preact({ compat: true }),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: { theme: "dracula" },
      gfm: false,
    }),
  ],
  redirects: {
    "/blog": "/blog/1",
  },
});
